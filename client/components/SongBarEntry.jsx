import React from 'react';
import PropTypes from 'prop-types';

const SongBarEntry = ({ height, bar }) => (
  <div
    className="player-songbar-bar"
    style={{ height: height * bar }}
  />
);

SongBarEntry.propTypes = {
  height: PropTypes.number.isRequired,
  bar: PropTypes.number.isRequired,
};

export default SongBarEntry;
