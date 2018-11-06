import React from 'react';
import PropTypes from 'prop-types';
import SongBarEntry from './SongBarEntry.jsx';
import helpers from '../helpers/playerHelpers.js';
import styles from '../../public/assets/styles/songBar.css';

const SongBar = ({
  songProfile, playState, handleScan, handleClick,
}) => {
  const bars = [[], []];
  const locations = ['upper', 'lower'];
  const currentMinSec = helpers.convertToMinSec(playState.currentTime);
  const totalMinSec = helpers.convertToMinSec(playState.totalTime);
  const nBars = songProfile.profile.length;

  songProfile.profile.forEach((barHeight, i) => {
    locations.forEach((location, j) => {
      bars[j].push((<SongBarEntry
        position={location}
        barHeight={barHeight}
        playState={playState}
        barFraction={i / nBars}
        handleScan={(location === 'upper') ? handleScan : () => {}}
        handleClick={(location === 'upper') ? handleClick : () => {}}
        key={`bar_${location}_${i}`}
      />
      ));
    });
  });
  const handleBarClick = (e) => {
    const eT = e.target;
    if (eT.className.includes('player-songbar-upper')) {
      handleClick((eT.offsetLeft - eT.parentNode.offsetLeft) / eT.parentNode.offsetWidth);
    } else {
      handleClick((e.pageX - eT.offsetLeft) / eT.offsetWidth);
    }
  };

  return (
    <div
      className={styles['player-songbar']}
      onPointerLeave={() => handleScan()}
      onClick={handleBarClick}
    >
      <div className={styles['player-songbar-upper']}>
        { bars[0] }
      </div>
      <div className={styles['player-songbar-lower']}>
        { bars[1] }
      </div>
      <div className={styles['player-songbar-current-time']}>
        <span className={styles['player-songbar-current-time-span']}>{currentMinSec}</span>
      </div>
      <div className={styles['player-songbar-total-time']}>
        <span className={styles['player-songbar-total-time-span']}>{totalMinSec}</span>
      </div>
    </div>
  );
};

SongBar.propTypes = {
  songProfile: PropTypes.object.isRequired,
  playState: PropTypes.object.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SongBar;
