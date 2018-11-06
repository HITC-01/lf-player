import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from '../../public/assets/styles/songExtras.css';

const SongExtras = ({ song, handleInfoClick }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    handleInfoClick('Genre Tag');
  };

  return (
    <div className={styles['player-display-extras']}>
      <h4 className={styles['player-song-date']}>{moment(song.songAdded).fromNow()}</h4>
      <a
        className={styles['player-song-tag']}
        href="#"
        onClick={handleLinkClick}
      >
        <span className={styles['player-song-tag-span']}>{`# ${song.tag}`}</span>
      </a>
    </div>
  );
};

SongExtras.propTypes = {
  song: PropTypes.object.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

export default SongExtras;
