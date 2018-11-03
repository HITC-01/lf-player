import React from 'react';
import PropTypes from 'prop-types';
import SongCommentsEntry from './SongCommentsEntry.jsx';

const SongComments = ({ comments, nowPlaying, resetNowPLaying }) => {
  const handleReply = (user) => {
    window.alert(`On click, this would allow you to comment @${user}`);
  };

  const commentsAll = comments.map((comment, i) => (
    <SongCommentsEntry
      key={i}
      comment={comment}
      nowPlaying={i === nowPlaying}
      handleReply={handleReply}
      resetNowPLaying={resetNowPLaying}
    />
  ));

  return (
    <div id="player-comments">
      {commentsAll}
    </div>
  );
};

SongComments.propTypes = {
  comments: PropTypes.array.isRequired,
  nowPlaying: PropTypes.number.isRequired,
  resetNowPLaying: PropTypes.func.isRequired,
};

export default SongComments;
