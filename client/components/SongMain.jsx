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
        id="player-main-play"
        type="button"
        onClick={() => { handlePlayClick(); }}
      >
        {playIcon}
      </button>
      <a
        id="player-song-artist"
        href="#"
        onClick={handleLinkClick}
      >
        {song.artist}
      </a>
      <h1 id="player-song-title">{song.title}</h1>
      <a
        id="player-song-album"
        href="#"
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
