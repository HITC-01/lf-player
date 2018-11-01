import React from 'react';
import PropTypes from 'prop-types';

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

  return (
    <div id="player-display-main">
      <button
        className="player-main-play"
        id={`player-main-${playState}`}
        type="button"
        onClick={() => { handlePlayClick(); }}
      >
        {playIcon}
      </button>
      <a
        id="player-main-artist"
        href="#"
        onClick={handleLinkClick}
      >
        <span>{song.artist_name}</span>
      </a>
      <h1 id="player-main-title"><span>{song.title}</span></h1>
      <a
        id="player-main-album"
        href="#"
        hidden={hidden}
        onClick={handleLinkClick}
      >
        <span>{song.album}</span>
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
