import React from 'react';
import PropTypes from 'prop-types';

const SongArtModal = ({
  onCloseRequest, image, title, artist,
}) => {
  const keyCheck = (e) => {
    console.log('calling');
    if (e.keyCode === 27) {
      onCloseRequest(false);
    }
  };

  window.addEventListener('keyup', keyCheck);
  return (
    <div
      className="player-art-modal-overlay"
    >
      <div
        className="player-art-modal"
      >
        <p id="player-art-modal-title">{`${title} - ${artist}`}</p>
        <hr />
        <img
          id="player-art-modal-image"
          src={image}
          alt="album-art"
        />
      </div>
      <button
        type="button"
        className="player-art-modal-close-button"
        onClick={(e) => onCloseRequest(false, e)}
      >
        <i className="fas fa-times  fa-3x" />
      </button>
    </div>
  );
};

SongArtModal.propTypes = {
  onCloseRequest: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SongArtModal;
