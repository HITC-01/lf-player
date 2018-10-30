import React from 'react';
import PropTypes from 'prop-types';
import SongBar from './SongBar.jsx';
import SongComments from './SongComments.jsx';

const SongTracker = ({
  songProfile, comments, handleScan, handleReplyComment, currentTime, totalTime,
}) => {
  return (
    <div id="player-profile">
      <SongBar
        songProfile={songProfile}
        handleScan={handleScan}
        currentTime={currentTime}
        totalTime={totalTime}
      />
      <SongComments
        comments={comments}
        handleReplyComment={handleReplyComment}
      />
    </div>
  );
};

SongTracker.propTypes = {
  songProfile: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleReplyComment: PropTypes.func.isRequired,
};

export default SongTracker;
