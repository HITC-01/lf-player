import React from 'react';
import PropTypes from 'prop-types';

const SongMain = ({
  song, playing, handlePlayClick, handleInfoClick,
}) => {
  const hidden = false;
  const playIcon = (playing) ? (<i className="fas fa-pause-circle" />)
    : (<i className="fas fa-play-circle" />);
  const handleLinkClick = (e) => {
    e.preventDefault();
    const type = (e.target.id === 'player-song-artist') ? 'Artist' : 'Album';
    handleInfoClick(e.target);
    window.alert(`On click, this would send you to the ${type} page`);
  };

  return (
    <div id="song-display-main-wrapper">
      <button
        type="button"
        onClick={() => { handlePlayClick(); }}
        id="player-main-play"
      >
        {playIcon}
      </button>
      <a
        href="#"
        id="player-song-artist"
        onClick={handleLinkClick}
      >
        {song.artist}
      </a>
      <h1 id="player-song-title">{song.title}</h1>
      <a
        href="#"
        id="player-song-album"
        hidden={hidden}
        onClick={handleLinkClick}
      >
        {song.album}
      </a>
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
