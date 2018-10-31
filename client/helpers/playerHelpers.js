const createSongBar = (heights, max, nBars = 140) => {
  const bars = [];
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
  if (typeof timeSec !== 'number') {
    return '0:00';
  }
  const minutes = `${Math.floor(timeSec / 60)}`;
  let seconds = `${(timeSec - minutes * 60)}`;
  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

const colorBar = (barFrac, {
  currentTime, totalTime, playing, hovering, hoverPosition,
}) => {
  const playPosition = currentTime / totalTime;
  let barString = '';
  const barBetween = (hovering && (((hoverPosition > barFrac) && (playPosition < barFrac))
    || ((hoverPosition < barFrac) && (playPosition > barFrac))));

  if (playing && barBetween) {
    barString += '-hover-middle';
  } else {
    barString += (playing) ? '-playing' : '';
    barString += (playPosition > barFrac) ? '' : '-to-play';
  }
  return barString;
};

const helpers = { createSongBar, convertToMinSec, colorBar };
export default helpers;
