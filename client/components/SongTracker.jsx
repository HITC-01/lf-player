import React from 'react';
import PropTypes from 'prop-types';
import SongBar from './SongBar.jsx';
import SongComments from './SongComments.jsx';

const SongTracker = ({
  songProfile, comments, playState,
  handleScan, handleReplyComment, handleBarClick,
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
      handleReplyComment={handleReplyComment}
    />
  </div>
);

SongTracker.propTypes = {
  songProfile: PropTypes.object.isRequired,
  playState: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleBarClick: PropTypes.func.isRequired,
  handleReplyComment: PropTypes.func.isRequired,
};

export default SongTracker;
