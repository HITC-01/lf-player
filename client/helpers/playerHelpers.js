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

const helpers = { createSongBar };
export default helpers;
