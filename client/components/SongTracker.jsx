import React from 'react';
import PropTypes from 'prop-types';
import SongBar from './SongBar.jsx';
import SongComments from './SongComments.jsx';

const SongTracker = ({
  songProfile, comments, playState, nowPlaying,
  handleScan, handleBarClick, resetNowPLaying,
}) => (
  <div id="player-profile">
    <SongBar
      songProfile={songProfile}
      playState={playState}
      handleScan={handleScan}
      handleClick={handleBarClick}
    />
    <SongComments
      comments={comments}
      nowPlaying={nowPlaying}
      resetNowPLaying={resetNowPLaying}
    />
  </div>
);

SongTracker.propTypes = {
  songProfile: PropTypes.object.isRequired,
  playState: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  nowPlaying: PropTypes.number.isRequired,
  resetNowPLaying: PropTypes.func.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleBarClick: PropTypes.func.isRequired,
};

export default SongTracker;
