import React from 'react';
import PropTypes from 'prop-types';

const SongComments = ({ comments }) => {
  const handleReply = (user) => {
    window.alert(`On click, this would allow you to comment @ ${user}`);
  };

  const commentsAll = comments.map((comment, i) => (
    <span
      key={i}
      handleReply={handleReply}
    >
      {comment.text}
    </span>
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
