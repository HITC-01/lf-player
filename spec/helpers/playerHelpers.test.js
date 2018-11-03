/* eslint-env jest */
import helpers from '../../client/helpers/playerHelpers.js';

describe('createSongBar', () => {
  // TODO: Add in a test for edge case where len input < nBars
  // TODO: addin in a test for different inputs?
  let heights = '';
  let max = 0;

  beforeEach(() => {
    heights = '';
    max = Math.floor(Math.random() * 30) + 100;
    const soundLength = Math.floor(Math.random() * 100) + 700;
    for (let i = 0; i < soundLength; i += 1) {
      heights += `${Math.floor(Math.random() * max)},`;
    }
  });

  test('should return an array of default length (140) of numbers representing song profile', () => {
    const songProfile = helpers.createSongBar(heights, max);
    expect(songProfile.length).toBe(140);
    expect(Math.max(...songProfile)).toBeLessThanOrEqual(1);
    expect(Math.min(...songProfile)).toBeGreaterThanOrEqual(0);
  });

  test('should return an array of varied length (170) of numbers representing song profile', () => {
    const songProfile = helpers.createSongBar(heights, max, 170);
    expect(songProfile.length).toBe(170);
    expect(Math.max(...songProfile)).toBeLessThanOrEqual(1);
    expect(Math.min(...songProfile)).toBeGreaterThanOrEqual(0);
  });
});

describe('convertToMinSec', () => {
  test('convert time in sec to a string format: min:sec', () => {
    expect(helpers.convertToMinSec(311)).toBe('5:11');
  });
  test('add extra zeros when needed to seconds', () => {
    expect(helpers.convertToMinSec(241)).toBe('4:01');
  });
  test('add zeros when needed to minutes', () => {
    expect(helpers.convertToMinSec(31)).toBe('0:31');
  });
  test('force non-numbers to zero', () => {
    expect(helpers.convertToMinSec('hi')).toBe('0:00');
  });
});


// Tests for COLORBAR
describe('colorBar', () => {
  const barFrac = 0.5;
  let playStats = { };

  beforeEach(() => {
    playStats = {
      currentTime: 0,
      totalTime: 100,
      playing: false,
      hovering: false,
      hoverPosition: 0.3,
    };
  });

  test('makes a string indicating that song is not playing, position is to be played', () => {
    expect(helpers.colorBar(barFrac, playStats)).toBe('-to-play');
  });

  test('makes a string indicating that song is not playing, hovering, position is to be played', () => {
    playStats.hovering = true;
    expect(helpers.colorBar(barFrac, playStats)).toBe('-to-play');
  });

  test('makes a string indicating that the song is being played and position is to be played', () => {
    playStats.playing = true;
    playStats.currentTime = 30;
    expect(helpers.colorBar(barFrac, playStats)).toBe('-playing-to-play');
  });

  test('makes a string indicating that song is playing, position is played', () => {
    playStats.playing = true;
    playStats.currentTime = 70;
    expect(helpers.colorBar(barFrac, playStats)).toBe('-playing');
  });

  test('makes a string indicating that song is playing, position is between hover and playing', () => {
    playStats.playing = true;
    playStats.hovering = true;
    playStats.currentTime = 70;
    expect(helpers.colorBar(barFrac, playStats)).toBe('-hover-middle');
  });

  test('makes a string indicating that song is playing, position is between hover and playing', () => {
    playStats.playing = true;
    playStats.hovering = true;
    playStats.currentTime = 30;
    playStats.hoverPosition = 0.9;
    expect(helpers.colorBar(barFrac, playStats)).toBe('-hover-middle');
  });
});

// describe('', () => {
//   test('', () => {
//     expect().toBe();
//   });
//   test('', () => {
//     expect().toBe();
//   });
//   test('', () => {
//     expect().toBe();
//   });
//   test('', () => {
//     expect().toBe();
//   });
// });
