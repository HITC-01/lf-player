/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongBar from '../../client/components/SongBar.jsx';

describe('SongBar component', () => {
  let props = { };
  const simTarget = {
    screenX: 0,
    target: {
      className: '',
      offsetWidth: 1,
      offsetLeft: 0,
      parentNode: { offsetWidth: 10 },
    },
  };

  beforeEach(() => {
    props = {
      songProfile: { profile: [1, 2, 3, 4] },
      playState: {
        playing: false,
        currentTime: 0,
        totalTime: 300,
        hoverPosition: 0,
        hovering: false,
      },
      handleScan: jest.fn(),
      handleClick: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongBar {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(4);
    expect(component.prop('className')).toBe('player-songbar');
    expect(component.prop('onClick')).toBeInstanceOf(Function);
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to clicks on individual bar', () => {
    const component = shallow(<SongBar {...props} />);
    component.find('.player-songbar').simulate('click', simTarget);
    expect(props.handleClick).toHaveBeenCalled();
  });

  test('respond to clicks on parent', () => {
    const component = shallow(<SongBar {...props} />);
    component.find('.player-songbar').simulate('click', simTarget);
    expect(props.handleClick).toHaveBeenCalled();
  });

  test('respond to pointerLeave', () => {
    const component = shallow(<SongBar {...props} />);
    component.find('.player-songbar').simulate('pointerLeave');
    expect(props.handleScan).toHaveBeenCalled();
  });
});
