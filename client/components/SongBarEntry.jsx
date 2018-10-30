import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/playerHelpers.js';

const SongBarEntry = ({ position, bar, currentTime, totalTime, barFraction }) => {
  const height = (position === 'lower') ? 20 : 80;
  let barClass = `player-songbar-${position}-bar `;
  barClass += helpers.colorBar(currentTime, totalTime, barFraction);
  return (
    <div
      className={barClass}
      style={{ height: height * bar }}
    />
  );
};

SongBarEntry.propTypes = {
  position: PropTypes.string.isRequired,
  bar: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  barFraction: PropTypes.number.isRequired,
};

export default SongBarEntry;
