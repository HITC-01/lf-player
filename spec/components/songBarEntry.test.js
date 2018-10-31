/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongBarEntry from '../../client/components/SongBarEntry.jsx';

describe('SongBarEntry component', () => {
  let props = { };

  beforeEach(() => {
    props = {
      position: 'upper',
      barHeight: 0.5,
      playState: {
        playing: false,
        intervalId: 0,
        currentTime: 0,
        totalTime: 300,
        hoverPosition: 0,
        hovering: false,
      },
      barFraction: 0.9,
      handleScan: jest.fn(x => x),
      handleClick: jest.fn(x => x),
    };
  });

  test('check props', () => {
    const component = shallow(<SongBarEntry {...props} />);
    expect(component.props().length).toBe(4);
    expect(component.props('position')).toBe('upper');
    expect(component.props('onClick')).toBeInstanceOf(Function);
  });

  test('render single song bar upper bar with correct class', () => {
    const component = shallow(<SongBarEntry {...props} />);
    expect(component.find('div')).toBeDefined();
    expect(component.find('div').hasClass('player-songbar-upper-to-play')).toBe(true);
  });

  test('render single song bar lower bar with correct class', () => {
    props.position = 'lower';
    const component = shallow(<SongBarEntry {...props} />);
    expect(component.find('div')).toBeDefined();
    expect(component.find('div').hasClass('player-songbar-lower-to-play')).toBe(true);
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongBarEntry {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // test('respond to clicks', () => {
  //   const component = shallow(<SongBarEntry {...props} />);
  //   component.find('div').simulate('click');
  //   expect(fraction).toBe(0.9);
  // });
});
