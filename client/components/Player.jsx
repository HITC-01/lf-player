import React from 'react';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

const cloneDeep = require('lodash.clonedeep');

const nSongsInDB = 100;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.intervalId = 0;
    this.state = {
      song: { albumImageUrl: '', duration: 0 },
      playState: helpers.initializePlayState(),
      comments: [],
      songProfile: { profile: [] },
    };

    this.count = this.count.bind(this);
    this.getSongData = this.getSongData.bind(this);
    this.getComments = this.getComments.bind(this);
    this.handleAlbumClick = this.handleAlbumClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleBarScan = this.handleBarScan.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    const songId = Math.floor(Math.random() * nSongsInDB) + 1;
    this.getSongData(songId)
      .then(() => this.getComments(songId))
      .catch(err => console.log(`Error: ${err}`));
  }

  getSongData(id) {
    const url = `sc/songs/${id}`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { songProfile, song } = helpers.initializeStateFromData(res.data);
        const playState = helpers.initializePlayState();
        playState.totalTime = res.data.duration;
        songProfile.profile = helpers.createSongBar(res.data.profile, songProfile.height);
        this.setState({ song, playState, songProfile });
      });
  }

  getComments(id) {
    const url = `sc/songs/${id}/comments`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        this.setState({ comments: res.data });
      });
  }

  handleAlbumClick(type) {
    window.alert(`On click, TODO
      to the ${type} modal`);
  }

  handleBarScan(hovering = false, fraction = 0) {
    const { playState } = cloneDeep(this.state);
    playState.hoverPosition = fraction;
    playState.hovering = hovering;
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

  handlePlayClick() {
    const { playState } = cloneDeep(this.state);
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
      clearInterval(this.intervalId);
      return;
    }
    playState = { ...playState, currentTime: playState.currentTime + 1 };
    this.setState({ playState });
  }

  play() {
    const { playState } = cloneDeep(this.state);
    this.intervalId = setInterval(this.count, 1000);
    playState.hoverPosition = null;
    this.setState({ playState });
  }

  pause() {
    clearInterval(this.intervalId);
  }

  render() {
    const {
      song, playState, songProfile, comments,
    } = this.state;

    return (
      <div
        className={`player-background-${song.backgroundColor}`}
        id="player-all"
      >
        <SongDisplay
          song={song}
          playing={playState.playing}
          handleAlbumClick={this.handleAlbumClick}
          handlePlayClick={this.handlePlayClick}
        />
        <SongTracker
          songProfile={songProfile}
          playState={playState}
          comments={comments}
          handleScan={this.handleBarScan}
          handleBarClick={this.handleBarClick}
          handleReplyComment={() => {}}
        />
      </div>
    );
  }
}

export default Player;
