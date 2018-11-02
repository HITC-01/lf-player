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

    this.intervalId = null;
    this.url = props.url;

    this.state = {
      song: { albumImageUrl: '', duration: 0 },
      playState: helpers.initializePlayState(),
      comments: [],
      nowPlaying: [null, -1],
      songTimes: [[]],
      commentHover: false,
      songProfile: { profile: [] },
    };

    this.count = this.count.bind(this);
    this.getSongData = this.getSongData.bind(this);
    this.getComments = this.getComments.bind(this);
    this.handleAlbumClick = this.handleAlbumClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleBarScan = this.handleBarScan.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.resetNowPLaying = this.resetNowPLaying.bind(this);
  }

  componentDidMount() {
    const songId = Math.floor(Math.random() * nSongsInDB) + 1;
    this.getSongData(songId)
      .then(() => this.getComments(songId))
      .catch(err => console.log(`Error: ${err}`));
  }

  // Queries to server
  getSongData(id) {
    const url = `${this.url}/sc/songs/${id}`;
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
        const { song } = this.state;
        const songTimes = {};
        res.data.forEach((comment, i) => {
          const timeStamp = Math.floor(comment.time * song.duration / 100);
          songTimes[timeStamp] = i;
        });
        this.setState({ comments: res.data, songTimes });
      });
  }

  // Modal display
  handleAlbumClick(type) {
    window.alert(`On click, TODO to the ${type} modal`);
  }

  // Event handlers
  handleBarScan(hovering = false, fraction = 0) {
    const { playState } = cloneDeep(this.state);
    playState.hovering = hovering;
    playState.hoverPosition = (hovering) ? fraction : null;
    this.setState({ playState });
  }

  handleBarClick(fraction) {
    const { playState } = this.state;
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

  // Player play button functions
  count() {
    let { playState } = this.state;
    const newTime = playState.currentTime + 1;

    if (playState.currentTime >= playState.totalTime) {
      playState = { ...playState, currentTime: playState.totalTime, playing: false };
      this.setState({ playState });
      clearInterval(this.intervalId);
      return;
    }

    const nowPlaying = this.findNowPlaying(newTime);
    playState = { ...playState, currentTime: newTime };
    this.setState({ playState, nowPlaying });
  }

  play() {
    this.intervalId = setInterval(this.count, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
    this.resetNowPLaying();
    this.intervalId = null;
  }

  // Methods for finding a comment to display
  findNowPlaying(newTime) {
    const showTime = 3;
    let { nowPlaying } = this.state;
    const { songTimes, commentHover } = this.state;

    if (!commentHover && (newTime in songTimes)) {
      nowPlaying = [newTime, songTimes[newTime]];
    } else if (!commentHover && (nowPlaying[0] !== null)) {
      const diff = newTime - nowPlaying[0];
      if ((diff >= showTime)) {
        nowPlaying = [null, -1];
      }
    }
    return nowPlaying;
  }

  resetNowPLaying(commentHover = false) {
    this.setState({ nowPlaying: [null, -1], commentHover });
  }

  render() {
    const {
      song, playState, songProfile, comments, nowPlaying,
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
          nowPlaying={nowPlaying[1]}
          resetNowPLaying={this.resetNowPLaying}
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
