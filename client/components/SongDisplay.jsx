import React from 'react';
import PropTypes from 'prop-types';
import SongMain from './SongMain.jsx';
import SongArt from './SongArt.jsx';
import SongExtras from './SongExtras.jsx';

const SongDisplay = ({
  song, playing, handleAlbumClick, handlePlayClick, handleInfoClick,
}) => (
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
      songImage={song.album_imageUrl}
      handleAlbumClick={handleAlbumClick}
    />
  </div>
);

SongDisplay.propTypes = {
  song: PropTypes.object.isRequired,
  playing: PropTypes.bool.isRequired,
  handleAlbumClick: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};

export default SongDisplay;
