import React from 'react';
import PropTypes from 'prop-types';

const SongArt = ({
  songImage, handleAlbumClick,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    const type = (e.target.id === 'player-song-artist') ? 'Artist' : 'Album';
    handleAlbumClick(type);
  };

  return (
    <div id="player-display-album">
      <a href="#" onClick={handleClick}>
        <img src={songImage} alt="album-art" />
      </a>
    </div>
  );
};

SongArt.propTypes = {
  songImage: PropTypes.string.isRequired,
  handleAlbumClick: PropTypes.func.isRequired,
};

export default SongArt;
