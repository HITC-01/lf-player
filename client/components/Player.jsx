import React from 'react';
import PropTypes from 'prop-types';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import helpers from '../helpers/playerHelpers.js';

const cloneDeep = require('lodash.clonedeep');

const nSongsInDB = 100;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.intervalId = 0;
    this.url = props.url;
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
    const url = `${this.url}/sc/songs/${id}`;
    console.log(url);
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
    const url = `${this.url}/sc/songs/${id}/comments`;
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
    this.handlePlayClick(Math.floor(fraction * playState.totalTime));
  }

  handlePlayClick(currentTime) {
    const { playState } = cloneDeep(this.state);

    if (currentTime) {
      playState.currentTime = currentTime;
      clearInterval(this.intervalId);
    }

    playState.playing = (currentTime) ? true : !playState.playing;
    if (!playState.playing) {
      this.pause();
    } else {
      this.play();
    }
    playState.hovering = false;
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
    this.intervalId = setInterval(this.count, 1000);
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
        />
      </div>
    );
  }
}

Player.propTypes = {
  url: PropTypes.string,
};

Player.defaultProps = {
  url: '',
};

export default Player;
