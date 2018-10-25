const moment = require('moment');

module.exports = ({
  song, handleInfoClick,
}) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.alert(`On click, this would send you to the genre page`);
    // handleInfoClick();
  };

  return (
    <div id="song-display-main-wrapper">
      <h4 id="player-song-date">{moment(song.added).fromNow()}</h4>
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

module.exports.propTypes = {
  song: PropTypes.object.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
};
