import React from 'react';
import PropTypes from 'prop-types';
import SongMain from './SongMain.jsx';
import SongArt from './SongArt.jsx';
import SongExtras from './SongExtras.jsx';

const SongDisplay = ({
  song, playing, handleAlbumClick, handlePlayClick, handleInfoClick,
}) => (
  <div id="song-display">
    <SongMain
      id="song-display-main"
      song={song}
      playing={playing}
      handlePlayClick={handlePlayClick}
      handleInfoClick={handleInfoClick}
    />
    <SongExtras
      id="song-display-extras"
      song={song}
      handleInfoClick={handleInfoClick}
    />
    <SongArt
      id="song-display-album"
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
