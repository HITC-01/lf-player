import React from 'react';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: { album_imageUrl: '', duration: 0 },
      playState: {
        playing: false, intervalId: 0,
        currentTime: 0, hoverPosition: 0,
        hovering: false,
      },
      comments: [],
      songProfile: { profile: [] },
      artists: new Set(),
      nSongs: 100,
    };

    this.getSongData = this.getSongData.bind(this);
    this.getSongProfile = this.getSongProfile.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getArtists = this.getArtists.bind(this);
    this.handleAlbumClick = this.handleAlbumClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleBarHover = this.handleBarHover.bind(this);
    this.handleBarExit = this.handleBarExit.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.count = this.count.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {
    const { nSongs } = this.state;
    const songId = Math.floor(Math.random() * nSongs) + 1;
    this.getSongData(songId)
      .then(() => this.getSongProfile(songId))
      .then(() => this.getComments(songId))
      .then(() => {
        const { artists } = this.state;
        this.getArtists(artists);
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  getSongData(id) {
    const url = `/songs/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { artists, playState } = this.state;
        artists.add(res.data.artist_id);
        playState.totalTime = res.data.duration;
        this.setState({ song: res.data, artists, playState });
      });
  }

  getSongProfile(id) {
    const url = `/songProfiles/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const songProfile = res.data;
        songProfile.profile = helpers.createSongBar(res.data.profile, res.data.height);
        this.setState({ songProfile });
      });
  }

  getComments(id) {
    const url = `/comments?song=${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { artists } = this.state;
        res.data.forEach(comment => artists.add(comment.artist_id));
        this.setState({ comments: res.data, artists });
      });
  }

  getArtists(ids) {
    const idsArray = Array.from(ids);
    const idString = idsArray.join(',') || '1';
    const url = `/artists?id=${idString}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { song } = this.state;
        song.artist = res.data.find(artist => artist.id === song.artist_id).name;
        this.setState({ artists: res.data });
      });
  }

  handleAlbumClick(type) {
    window.alert(`On click, this would send you
      to the ${type} page`);
  }

  handleBarHover(bar) {
    const { playState, songProfile } = this.state;
    playState.hoverPosition = bar / songProfile.profile.length;
    playState.hovering = true;
    this.setState({ playState });
  }

  handleBarExit() {
    const { playState } = this.state;
    playState.hoverPosition = 0;
    playState.hovering = false;
    this.setState({ playState });
  }

  handleBarClick(fraction) {
    let { playState } = this.state;
    console.log('I was clicked!', fraction, playState.totalTime, Math.floor(fraction * playState.totalTime));
    if (!playState.playing) {
      this.handlePlayClick();
    }
    playState = {
      ...playState,
      currentTime: Math.floor(fraction * playState.totalTime),
      hovering: false,
    };
    this.setState({ playState });
  }

  handleInfoClick(info) {
    window.alert(`On click, this would send you to
      the ${info} page`);
  }

  handlePlayClick() {
    const { playState } = this.state;
    if (playState.playing) {
      this.pause();
    } else {
      this.play();
    }
    playState.playing = !playState.playing;
    this.setState({ playState });
  }

  count() {
    let { playState } = this.state;
    if (playState.currentTime >= playState.totalTime) {
      playState = { ...playState, currentTime: playState.totalTime, playing: false };
      this.setState({ playState });
      clearInterval(playState.intervalId);
      return;
    }
    playState = { ...playState, currentTime: playState.currentTime + 1 };
    this.setState({ playState });
  }

  play() {
    const { playState } = this.state;
    const intervalId = setInterval(this.count, 1000);
    playState.intervalId = intervalId;
    playState.hoverPosition = null;
    this.setState({ playState });
  }

  pause() {
    const { playState } = this.state;
    clearInterval(playState.intervalId);
  }

  render() {
    const {
      song, playState, songProfile, comments,
    } = this.state;

    return (
      <div
        className={`player-background-${song.background_color}`}
        id="player-all"
      >
        <SongDisplay
          song={song}
          playing={playState.playing}
          handleAlbumClick={this.handleAlbumClick}
          handleInfoClick={this.handleInfoClick}
          handlePlayClick={this.handlePlayClick}
        />
        <SongTracker
          songProfile={songProfile}
          playState={playState}
          comments={comments}
          handleScan={this.handleBarHover}
          handleExit={this.handleBarExit}
          handleBarClick={this.handleBarClick}
          handleReplyComment={() => {}}
        />
      </div>
    );
  }
}

export default Player;
