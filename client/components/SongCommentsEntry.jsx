import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/assets/styles/songCommentsEntry.css';

class SongCommentsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.createComments(props);
    this.toggleComment = this.toggleComment.bind(this);
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
        <span key={word} className={styles[`player-comment-${word}`]}>
          {`${data[word]}    `}
        </span>,
      );
    });
  }

  toggleComment(show = false) {
    const { resetNowPLaying } = this.props;
    resetNowPLaying(show);
    this.setState({ show });
  }

  render() {
    const { show } = this.state;
    const { comment, handleReply, nowPlaying } = this.props;
    const commentDetails = (nowPlaying || show) ? (<p className={styles[`${this.position}`]}>{this.comments}</p>) : '';

    return (
      <div
        className={styles['player-comment-single']}
        onMouseEnter={() => this.toggleComment(true)}
        onMouseLeave={() => this.toggleComment(false)}
        style={{ left: `${comment.time}%` }}
      >
        <img
          className={styles[`player-comment-image-${show ? 'show' : 'hide'}`]}
          src={comment.artistImageUrl}
          alt="user-profile"
          onClick={() => handleReply(comment.artistName)}
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
  resetNowPLaying: PropTypes.func.isRequired,
};

export default SongCommentsEntry;
