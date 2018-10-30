import React from 'react';
import PropTypes from 'prop-types';
import SongBarEntry from './SongBarEntry.jsx';
import helpers from '../helpers/playerHelpers.js';

const SongBar = ({
  songProfile, handleScan, currentTime, totalTime,
}) => {
  const upperBars = [];
  const lowerBars = [];
  const currentMinSec = helpers.convertToMinSec(currentTime);
  const totalMinSec = helpers.convertToMinSec(totalTime);

  songProfile.profile.forEach((bar, i) => {
    lowerBars.push((<SongBarEntry
      position="lower"
      bar={bar}
      currentTime={currentTime}
      totalTime={totalTime}
      barFraction={i / songProfile.profile.length}
      key={`bar_lower_${i}`}
    />
    ));
    upperBars.push((<SongBarEntry
      position="upper"
      bar={bar}
      currentTime={currentTime}
      totalTime={totalTime}
      barFraction={i / songProfile.profile.length}
      key={`bar_upper_${i}`}
    />
    ));
  });

  return (
    <div id="player-songbar">
      <div id="player-songbar-upper">
        { upperBars }
      </div>
      <div id="player-songbar-lower">
        { lowerBars }
      </div>
      <div id="player-songbar-current-time"><span>{currentMinSec}</span></div>
      <div id="player-songbar-total-time"><span>{totalMinSec}</span></div>
    </div>
  );
};

SongBar.propTypes = {
  songProfile: PropTypes.object.isRequired,
  handleScan: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default SongBar;
