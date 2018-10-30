import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/playerHelpers.js';

const SongBarEntry = ({
  position, bar, currentTime, totalTime, barFraction, playing,
}) => {
  const height = (position === 'lower') ? 30 : 70;
  let barClass = `player-songbar-${position}-bar `;
  barClass += helpers.colorBar(currentTime, totalTime, barFraction, playing);
  return (
    <div
      className={barClass}
      style={{ height: Math.floor(height * bar) }}
    />
  );
};

SongBarEntry.propTypes = {
  position: PropTypes.string.isRequired,
  bar: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  barFraction: PropTypes.number.isRequired,
  playing: PropTypes.bool.isRequired,
};

export default SongBarEntry;
