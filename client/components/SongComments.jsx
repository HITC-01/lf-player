import React from 'react';
import PropTypes from 'prop-types';

const SongComments = ({
  comments, handleReplyComment,
}) => {
  const commentsAll = comments.map((comment, i) => <span key={i}>{comment.text}</span>);
  return (
    <div id="player-comments">
      {commentsAll}
    </div>
  );
};

SongComments.propTypes = {
  comments: PropTypes.array.isRequired,
  handleReplyComment: PropTypes.func.isRequired,
};

export default SongComments;
