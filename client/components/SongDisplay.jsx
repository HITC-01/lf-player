import React from 'react';
import PropTypes from 'prop-types';
import SongMain from './SongMain.jsx';
import SongExtras from './SongExtras.jsx';
import SongArt from './SongArt.jsx';

const SongDisplay = ({
  song, playing, handlePlayClick,
}) => {
  const handleInfoClick = (info) => {
    window.alert(`On click, this would send you to the ${info} page`);
  };

  return (
    <div id="player-display">
      <SongMain
        song={song}
        playing={playing}
        handlePlayClick={handlePlayClick}
        handleInfoClick={handleInfoClick}
      />
      <SongExtras
        song={song}
        handleInfoClick={handleInfoClick}
      />
      <SongArt
        songImage={song.albumImageUrl}
        songTitle={song.title}
        songArtist={song.artistName}
      />
    </div>
  );
};

SongDisplay.propTypes = {
  song: PropTypes.object.isRequired,
  playing: PropTypes.bool.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
};

export default SongDisplay;
