import React from 'react';
import PropTypes from 'prop-types';
import SongBar from './SongBar.jsx';

const SongTracker = ({
  songProfile, comments, handleScan, handleReplyComment, playtime,
}) => {
  return (
    <div id="player-song-tracker">
      <SongBar
        id="player-song-bar"
        songProfile={songProfile}
        handleScan={handleScan}
        playtime={playtime}
      />
    </div>
  );
};

SongTracker.propTypes = {
  songProfile: PropTypes.object.isRequired,
  playtime: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleReplyComment: PropTypes.func.isRequired,
};

export default SongTracker;
