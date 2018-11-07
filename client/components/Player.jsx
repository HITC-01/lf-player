import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import SongDisplay from './SongDisplay.jsx';
import SongTracker from './SongTracker.jsx';
import styles from '../../public/assets/styles/player.css';
import helpers from '../helpers/playerHelpers.js';

const nSongsInDB = 100;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.intervalId = null;
    this.url = props.url;
    this.songId = props.songId;

    this.state = {
      song: {
        albumImageUrl: '',
        title: '',
        artistName: '',
        duration: 0,
      },
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
    this.handleBarClick = this.handleBarClick.bind(this);
    this.handleBarScan = this.handleBarScan.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.resetNowPLaying = this.resetNowPLaying.bind(this);
  }

  componentDidMount() {
    this.getSongData(this.songId)
      .then(() => this.getComments(songId))
      .catch(err => console.log(`Error: ${err}`));
  }

  // Queries to server
  getSongData(id) {
    const url = `${this.url}/player/songs/${id}`;
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
    const url = `${this.url}/player/songs/${id}/comments`;
    return fetch(url, { method: 'GET' })
      .then(stream => stream.json())
      .then((res) => {
        const { song } = this.state;
        const comments = res.data;
        const songTimes = {};
        comments.forEach((comment, i) => {
          const timeStamp = Math.floor(comment.time * song.duration / 100);
          songTimes[timeStamp] = i;
        });
        this.setState({ comments, songTimes });
      });
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

    if (typeof currentTime === 'number') {
      playState.currentTime = currentTime;
      clearInterval(this.intervalId);
    }

    playState.playing = (typeof currentTime === 'number') ? true : !playState.playing;
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

    if (playState.currentTime > playState.totalTime) {
      playState = { ...playState, currentTime: 0, playing: false };
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

    const playerStyle = styles[`player-background-${song.backgroundColor}`];
    return (
      <div
        className={playerStyle}
      >
        <SongDisplay
          song={song}
          playing={playState.playing}
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
  songId: PropTypes.number,
};

Player.defaultProps = {
  url: '',
  songId: 1,
};

export default Player;
