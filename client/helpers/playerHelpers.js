const createSongBar = (heights, max) => {
  const bars = [];
  const nBars = 150;
  let profile = heights.split(',');
  profile = profile.map(height => Number(height));
  profile.pop();

  const barInterval = Math.floor(profile.length / nBars);
  for (let i = 0; i < nBars; i += 1) {
    let mean = profile.slice(i * barInterval, (i + 1) * barInterval);
    mean = mean.reduce((sum, val) => sum + val, 0);
    bars.push(mean / barInterval / max);
  }
  return bars;
};

const convertToMinSec = (timeSec) => {
  const minutes = `${Math.floor(timeSec / 60)}`;
  let seconds = `${(timeSec - minutes * 60)}`;
  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const colorBar = (currentTime, totalTime, barFrac, playing) => {
  let barString = 'player-songbar-bar';
  barString += ((currentTime / totalTime) > barFrac) ? '' : '-to-play';
  barString += (playing) ? '-playing' : '';
  return barString;
};

const helpers = { createSongBar, convertToMinSec, colorBar };
export default helpers;
