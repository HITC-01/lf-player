import helpers from '../../client/helpers/playerHelpers.js';

describe('createSongBar', () => {
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
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

describe('colorBar', () => {
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
  // test('', () => {
  //   expect().toBe();
  // });
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
