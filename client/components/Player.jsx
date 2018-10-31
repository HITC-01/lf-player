import React from 'react';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

const nSongs = 100;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: { album_imageUrl: '', duration: 0 },
      playState: {
        playing: false,
        intervalId: 0,
        currentTime: 0,
        totalTime: 1,
        hoverPosition: 0,
        hovering: false,
      },
      comments: [],
      songProfile: { profile: [] },
    };

    this.getSongData = this.getSongData.bind(this);
    this.getSongProfile = this.getSongProfile.bind(this);
    this.getComments = this.getComments.bind(this);
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
    const songId = Math.floor(Math.random() * nSongs) + 1;
    this.getSongData(songId)
      .then(() => this.getSongProfile(songId))
      .then(() => this.getComments(songId))
      .catch(err => console.log(`Error: ${err}`));
  }

  getSongData(id) {
    const url = `/songs/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        console.log('in song get', res.data);
        const { playState } = this.state;
        playState.totalTime = res.data.duration;
        this.setState({ song: res.data, playState });
      });
  }

  getSongProfile(id) {
    const url = `/songs/${id}/songProfile`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const songProfile = res.data;
        songProfile.profile = helpers.createSongBar(res.data.profile, res.data.height);
        this.setState({ songProfile });
      });
  }

  getComments(id) {
    const url = `/songs/${id}/comments`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        console.log('returning to comments: ', res.data);
        this.setState({ comments: res.data });
      });
  }

  handleAlbumClick(type) {
    window.alert(`On click, this would send you
      to the ${type} page`);
  }

  handleBarHover(fraction) {
    const { playState } = this.state;
    playState.hoverPosition = fraction;
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
