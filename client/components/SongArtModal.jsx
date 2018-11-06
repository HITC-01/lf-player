import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/assets/styles/songArtModal.css';

const SongArtModal = ({
  onCloseRequest, image, title, artist,
}) => {
  const keyCheck = (e) => {
    if (e.keyCode === 27) {
      onCloseRequest(false);
    }
  };

  window.addEventListener('keyup', keyCheck);
  return (
    <div
      className={styles['player-art-modal-overlay']}
    >
      <div
        className={styles['player-art-modal']}
      >
        <p className={styles['player-art-modal-title']}>{`${title} - ${artist}`}</p>
        <hr className={styles['player-art-modal-hr']} />
        <img
          className={styles['player-art-modal-image']}
          src={image}
          alt="album-art"
        />
      </div>
      <button
        type="button"
        className={styles['player-art-modal-close-button']}
        onClick={(e) => onCloseRequest(false, e)}
      >
        <i className="fas fa-times fa-3x" />
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
