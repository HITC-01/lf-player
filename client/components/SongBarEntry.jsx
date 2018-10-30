import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../helpers/playerHelpers.js';

const SongBarEntry = ({
  position, number, bar, playState, barFraction,
  handleScan, handleExit, handleClick,
}) => {
  const height = (position === 'lower') ? 30 : 70;
  let barClass = `player-songbar-${position}`;

  barClass += helpers.colorBar(barFraction, playState);
  return (
    <div
      className={barClass}
      style={{ height: Math.floor(height * bar) }}
      onClick={handleClick}
      onPointerOver={() => handleScan(number)}
    />
  );
};

SongBarEntry.propTypes = {
  position: PropTypes.string.isRequired,
  bar: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  playState: PropTypes.object.isRequired,
  barFraction: PropTypes.number.isRequired,
  handleScan: PropTypes.func,
  handleExit: PropTypes.func,
  handleClick: PropTypes.func,
};

SongBarEntry.defaultProps = {
  handleScan: () => {},
  handleExit: () => {},
  handleClick: () => {},
};

export default SongBarEntry;
