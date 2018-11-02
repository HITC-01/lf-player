import React from 'react';
import PropTypes from 'prop-types';
import SongCommentsEntry from './SongCommentsEntry.jsx';

const SongComments = ({ comments }) => {
  const handleReply = (user) => {
    window.alert(`On click, this would allow you to comment @${user}`);
  };

  const commentsAll = comments.map((comment, i) => (
    <SongCommentsEntry
      key={i}
      comment={comment}
      handleReply={handleReply}
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
};

export default SongComments;
