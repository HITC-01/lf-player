import React from 'react';
import PropTypes from 'prop-types';

const SongArtModal = ({
  onCloseRequest, image, title, artist,
}) => {
  const keyCheck = (e) => {
    if (e.keyCode === 27) {
      onCloseRequest(false);
    }
  };

  window.addEventListener('keyup', keyCheck);
  const clickCheck = () => {

  };

  return (
    <div
      className="player-art-modal-overlay"
      onClick={clickCheck}
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
        onClick={() => onCloseRequest(false)}
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
