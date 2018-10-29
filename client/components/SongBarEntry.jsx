import React from 'react';
import PropTypes from 'prop-types';

const SongBarEntry = ({ position, bar, currentTime, totalTime }) => {
  const height = (position === 'lower') ? 20 : 80;
  return (
    <div
      className={`player-songbar-${position}-bar player-songbar-bar`}
      style={{ height: height * bar }}
    />
  );
};

SongBarEntry.propTypes = {
  position: PropTypes.string.isRequired,
  bar: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default SongBarEntry;
