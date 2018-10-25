module.exports = ({
  songImage, handleAlbumClick,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    const type = (e.target.id === 'player-song-artist') ? 'Artist' : 'Album';
    handleAlbumClick();
    window.alert(`On click, this would send you to the ${type} page`);
  };

  return (
    <div id="player-album">
      <a href="#" onClick={handleClick}>
        <img src={songImage} alt="album-art" />
      </a>
    </div>
  );
};

module.exports.propTypes = {
  songImage: PropTypes.string.isRequired,
  handleAlbumClick: PropTypes.func.isRequired,
};
