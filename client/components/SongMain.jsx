import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/assets/styles/songMain.css';

const SongMain = ({
  song, playing, handlePlayClick, handleInfoClick,
}) => {
  const hidden = false;
  const playIcon = (playing) ? (<i className="fas fa-pause fa-3x" />)
    : (<i className="fas fa-play fa-3x" />);
  const playState = (playing) ? 'on' : 'off';

  const handleLinkClick = (e) => {
    e.preventDefault();
    const type = (e.target.id === 'player-main-artist') ? 'Artist' : 'Album';
    handleInfoClick(type);
  };
  const playStateClass = `player-main-${playState}`;

  return (
    <div className={styles['player-display-main']}>
      <button
        className={`${styles['player-main-play']} ${playStateClass}`}
        type="button"
        onClick={handlePlayClick}
      >
        {playIcon}
      </button>
      <div className={styles['player-main-all']}>
        <a
          className={styles['player-main-artist']}
          href="#"
          onClick={handleLinkClick}
        >
          <span className={styles['player-main-artist-span']}>{song.artistName}</span>
        </a>
        <h1 className={styles['player-main-title']}>
          <span className={styles['player-main-title-span']}>{song.title}</span>
        </h1>
        <a
          className={styles['player-main-album']}
          href="#"
          hidden={hidden}
          onClick={handleLinkClick}
        >
          <span className={styles['player-main-album-span']}>{song.album}</span>
        </a>
      </div>
    </div>
  );
};

SongMain.propTypes = {
  song: PropTypes.object.isRequired,
  playing: PropTypes.bool.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

export default SongMain;
