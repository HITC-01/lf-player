import React from 'react';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: { album_imageUrl: '', duration: 0 },
      comments: [],
      songProfile: { profile: [] },
      artists: new Set(),
      playing: false,
      currentTime: 0,
      nSongs: 100,
      intervalId: 0,
    };

    this.getSongData = this.getSongData.bind(this);
    this.getSongProfile = this.getSongProfile.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getArtists = this.getArtists.bind(this);
    this.handleAlbumClick = this.handleAlbumClick.bind(this);
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
        const { artists } = this.state;
        artists.add(res.data.artist_id);
        this.setState({ song: res.data, artists });
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
    let idString = '';
    ids.forEach((id) => { idString += `${id},`; });
    idString = idString.substring(0, idString.length - 2);
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

  handleInfoClick(info) {
    window.alert(`On click, this would send you to
      the ${info} page`);
  }

  handlePlayClick() {
    const { playing } = this.state;
    if (playing) {
      this.pause();
    } else {
      this.play();
    }
    this.setState({ playing: !playing });
  }

  count() {
    const { currentTime, song, intervalId } = this.state;
    if (currentTime >= song.duration) {
      this.setState({ currentTime: song.duration, playing: false });
      clearInterval(intervalId);
      return;
    }
    this.setState({ currentTime: currentTime + 1 });
  }

  play() {
    const intervalId = setInterval(this.count, 1000);
    this.setState({ intervalId });
  }

  pause() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  render() {
    const {
      song, playing, currentTime, songProfile, comments,
    } = this.state;

    return (
      <div
        className={`player-background-${song.background_color}`}
        id="player-all"
      >
        <SongDisplay
          song={song}
          playing={playing}
          handleAlbumClick={this.handleAlbumClick}
          handleInfoClick={this.handleInfoClick}
          handlePlayClick={this.handlePlayClick}
        />
        <SongTracker
          songProfile={songProfile}
          currentTime={currentTime}
          totalTime={song.duration}
          comments={comments}
          playing={playing}
          handleScan={() => {}}
          handleReplyComment={() => {}}
        />
      </div>
    );
  }
}

export default Player;
