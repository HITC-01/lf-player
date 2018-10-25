const SongMain = require('./SongMain.jsx');
const SongArt = require('./SongArt.jsx');
const SongExtras = require('./SongExtras.jsx');

module.exports = ({
  song, handleAlbumClick, handlePlayClick, handleInfoClick,
}) => (
  <div id="song-display">
    <SongMain song={song} handlePlayClick={handlePlayClick} handleInfoClick={handleInfoClick} id="song-display-main" />
    <SongExtras song={song} handleInfoClick={handleInfoClick} id="song-display-extras" />
    <SongArt songImage={song.albumImageUrl} handleAlbumClick={handleAlbumClick} id="song-display-album" />
  </div>
);

module.exports.propTypes = {
  song: PropTypes.object.isRequired,
  handleAlbumClick: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};
