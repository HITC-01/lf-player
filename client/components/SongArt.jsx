import React from 'react';
import PropTypes from 'prop-types';
import SongArtModal from './SongArtModal.jsx';

class SongArt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  handleModalClick(e) {
    e.preventDefault();
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    const { songImage, songTitle, songArtist } = this.props;
    const { showModal } = this.state;
    const modal = (showModal)
      ? (
        <SongArtModal
          image={songImage}
          title={songTitle}
          artist={songArtist}
          onCloseRequest={this.handleModalClick}
        />
      )
      : '';

    return (
      <div id="player-display-album">
        <a href="#" onClick={this.handleModalClick}>
          <img src={songImage} alt="album-art" />
        </a>
        {modal}
      </div>
    );
  }
}

SongArt.propTypes = {
  songImage: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
};

export default SongArt;
