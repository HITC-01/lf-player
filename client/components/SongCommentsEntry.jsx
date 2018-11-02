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

  createComments({ comment }) {
    const max = 22;
    const { text, artistName, time } = comment;
    const data = { artist: artistName };
    data.text = (text.length > max) ? `${text.slice(0, max)}...` : text;

    let words = ['artist', 'text'];
    this.position = 'player-comment-right';
    this.comments = [];
    if (time > 50) {
      words = ['text', 'artist'];
      this.position = 'player-comment-left';
    }
    words.forEach((word) => {
      this.comments.push(
        <span key={word} className={`player-comment-${word}`}>
          {`${data[word]}    `}
        </span>,
      );
    });
  }

  showComment() {
    this.props.resetNowPLaying();
    this.setState({ show: true });
  }

  hideComment() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const { comment, handleReply, nowPlaying } = this.props;
    const commentDetails = (nowPlaying || show) ? (<p className={`${this.position}`}>{this.comments}</p>) : '';

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
  nowPlaying: PropTypes.bool.isRequired,
  handleReply: PropTypes.func.isRequired,
};

export default SongCommentsEntry;
