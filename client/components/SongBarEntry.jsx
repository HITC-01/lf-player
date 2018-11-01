import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/playerHelpers.js';

const SongBarEntry = ({
  position, barHeight, playState, barFraction,
  handleScan, handleClick,
}) => {
  const height = (position === 'lower') ? 30 : 70;
  let barClass = `player-songbar-${position}`;

  barClass += helpers.colorBar(barFraction, playState);
  return (
    <div
      className={barClass}
      style={{ height: Math.floor(height * barHeight) }}
      onClick={() => handleClick(barFraction)}
      onPointerOver={() => handleScan(true, barFraction)}
    />
  );
};

SongBarEntry.propTypes = {
  position: PropTypes.string.isRequired,
  barHeight: PropTypes.number.isRequired,
  playState: PropTypes.object.isRequired,
  barFraction: PropTypes.number.isRequired,
  handleScan: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SongBarEntry;
