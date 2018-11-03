import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SongExtras = ({ song, handleInfoClick }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    handleInfoClick('Genre Tag');
  };

  return (
    <div id="player-display-extras">
      <h4 id="player-song-date">{moment(song.songAdded).from(new Date().setHours(0, 0, 0, 0))}</h4>
      <a
        id="player-song-tag"
        href="#"
        onClick={handleLinkClick}
      >
        <span>{`# ${song.tag}`}</span>
      </a>
    </div>
  );
};

SongExtras.propTypes = {
  song: PropTypes.object.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

export default SongExtras;
