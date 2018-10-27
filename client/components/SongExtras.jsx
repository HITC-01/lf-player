import React from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');

const SongExtras = ({
  song, handleInfoClick,
}) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.alert('On click, this would send you to the genre page');
    handleInfoClick(e.target);
  };

  return (
    <div id="song-display-extras">
      <h4 id="player-song-date">{moment(song.song_added).fromNow()}</h4>
      <a
        href="#"
        id="player-song-tag"
        onClick={handleLinkClick}
      >
        {song.tag}
      </a>
    </div>
  );
};

SongExtras.propTypes = {
  song: PropTypes.object.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

export default SongExtras;
