import React from 'react';
import PropTypes from 'prop-types';

class SongCommentsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.createComments(props);
    this.showComment = this.showComment.bind(this);
    this.hideComment = this.hideComment.bind(this);
  }

  createComments({ comment, position }) {
    const max = 22;
    const { text, artistName } = comment;
    const data = { artist: artistName };
    data.text = (text.length > max) ? `${text.slice(0, max)}...` : text;

    let words = ['artist', 'text'];
    this.comments = [];
    if (position > 50) {
      words = ['text', 'artist'];
    }
    words.forEach((word) => {
      this.comments.push(<p className={`player-comment-${word}`} key={word}>{data[word]}</p>);
    });
  }

  showComment() {
    this.setState({ show: true });
  }

  hideComment() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const { comment, handleReply } = this.props;
    const commentDetails = (show) ? this.comments : '';

    return (
      <div
        className="player-comment-single"
        onMouseOver={this.showComment}
        onMouseLeave={this.hideComment}
        style={{ left: `${comment.time}%` }}
      >
        <img
          src={comment.artistImageUrl}
          alt="user-profile"
          onClick={() => handleReply(comment.name)}
        />
        {commentDetails}
      </div>
    );
  }
}

SongCommentsEntry.propTypes = {
  comment: PropTypes.object.isRequired,
  handleReply: PropTypes.func.isRequired,
};

export default SongCommentsEntry;
