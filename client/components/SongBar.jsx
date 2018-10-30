import React from 'react';
import PropTypes from 'prop-types';
import SongBarEntry from './SongBarEntry.jsx';
import helpers from '../helpers/playerHelpers.js';

const SongBar = ({
  songProfile, playState, handleScan, handleExit, handleClick,
}) => {
  const bars = [[], []];
  const locations = ['upper', 'lower'];
  const currentMinSec = helpers.convertToMinSec(playState.currentTime);
  const totalMinSec = helpers.convertToMinSec(playState.totalTime);


  songProfile.profile.forEach((bar, i) => {
    locations.forEach((location, j) => {
      bars[j].push((<SongBarEntry
        position={location}
        bar={bar}
        number={i}
        playState={playState}
        barFraction={i / songProfile.profile.length}
        handleScan={(location === 'upper') ? handleScan : () => {}}
        handleExit={(location === 'upper') ? handleExit : () => {}}
        handleClick={(location === 'upper') ? handleClick : () => {}}
        key={`bar_${location}_${i}`}
      />
      ));
    });
  });

  return (
    <div id="player-songbar" onPointerLeave={() => handleExit()}>
      <div id="player-songbar-upper">
        { bars[0] }
      </div>
      <div id="player-songbar-lower">
        { bars[1] }
      </div>
      <div id="player-songbar-current-time"><span>{currentMinSec}</span></div>
      <div id="player-songbar-total-time"><span>{totalMinSec}</span></div>
    </div>
  );
};

SongBar.propTypes = {
  songProfile: PropTypes.object.isRequired,
  playState: PropTypes.object.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SongBar;
