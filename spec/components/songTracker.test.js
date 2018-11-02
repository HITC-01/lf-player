/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongTracker from '../../client/components/SongTracker.jsx';

describe('SongTracker component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      songProfile: { profile: [] },
      comments: [],
      playState: {},
      handleScan: jest.fn(),
      handleBarClick: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongTracker {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('id')).toBe('player-profile');
    const bar = Array.from(Object.keys(component.find('SongBar').props()));
    expect(bar.length).toBe(4);
    expect(component.find('SongBar').prop('songProfile') instanceof Object).toBe(true);
    expect(component.find('SongBar').prop('playState') instanceof Object).toBe(true);
    expect(component.find('SongBar').prop('handleScan')).toBeTruthy();
    expect(component.find('SongBar').prop('handleClick')).toBeTruthy();

    const comments = Array.from(Object.keys(component.find('SongComments').props()));
    expect(comments.length).toBe(1);
    expect(component.find('SongComments').prop('comments') instanceof Object).toBe(true);
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongTracker {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});