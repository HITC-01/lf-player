module.exports = ({
  song, handlePlayClick, handleInfoClick,
}) => {
  const show = true;
  const handleLinkClick = (e) => {
    e.preventDefault();
    const type = (e.target.id === 'player-song-artist') ? 'Artist' : 'Album';
    handleInfoClick();
    window.alert(`On click, this would send you to the ${type} page`);
  };

  return (
    <div id="song-display-main-wrapper">
      <button
        type="button"
        onClick={() => { handlePlayClick(); }}
        id="player-main-play"
      >
        <i className="fas fa-play-circle" />
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
        display={show}
        onClick={handleLinkClick}
      >
        {song.album}
      </a>
    </div>
  );
};

module.exports.propTypes = {
  song: PropTypes.object.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};
