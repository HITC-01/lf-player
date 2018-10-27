import React from 'react';
import PropTypes from 'prop-types';
import SongBarEntry from './SongBarEntry.jsx';

const SongBar = ({ songProfile, handleScan, playtime }) => {
  const bars = songProfile.profile.map((bar, i) => (
    <SongBarEntry
      height={songProfile.height}
      bar={bar}
      key={i}
    />),
  );

  return (
    <div id="player-songbar" playtime={playtime}>
      { bars }
    </div>
  );
};

SongBar.propTypes = {
  songProfile: PropTypes.object.isRequired,
  handleScan: PropTypes.func.isRequired,
  playtime: PropTypes.number.isRequired,
};

export default SongBar;
