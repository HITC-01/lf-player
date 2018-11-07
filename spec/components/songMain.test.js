/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongMain from '../../client/components/SongMain.jsx';

describe('SongMain component', () => {
  let props = {};
  let event = {};

  beforeEach(() => {
    props = {
      playing: false,
      song: { artistName: 'Lisa Felberg', title: 'Best song ever', album: 'Funeral' },
      handlePlayClick: jest.fn(),
      handleInfoClick: jest.fn(),
    };
    event = {
      preventDefault: () => {},
      target: { id: '' },
    };
  });

  test('check props', () => {
    const component = shallow(<SongMain {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('className')).toBe('player-display-main');
    const playButton = Array.from(Object.keys(component.find('button').props()));
    expect(playButton.length).toBe(4);
    expect(component.find('button').prop('type')).toBe('button');
    expect(component.find('button').prop('className')).toBe('player-main-play player-main-off');

    // spans with input info
    expect(component.find('.player-main-artist span').prop('children')).toBe('Lisa Felberg');
    expect(component.find('.player-main-title span').prop('children')).toBe('Best song ever');
    expect(component.find('.player-main-album span').prop('children')).toBe('Funeral');

    expect(component.find('i').prop('className')).toBe('fas fa-play fa-3x');
  });

  test('check button when not playing', () => {
    props.playing = true;
    const component = shallow(<SongMain {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.find('i').prop('className')).toBe('fas fa-pause fa-3x');
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongMain {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to clicks on play button', () => {
    const component = shallow(<SongMain {...props} />);
    component.find('button').simulate('click');
    expect(props.handlePlayClick).toHaveBeenCalled();
  });

  test('respond to clicks on info', () => {
    const component = shallow(<SongMain {...props} />);
    component.find('.player-main-artist').simulate('click', event);
    expect(props.handleInfoClick).toHaveBeenCalled();
  });

  test('respond to clicks on info', () => {
    const component = shallow(<SongMain {...props} />);
    component.find('.player-main-artist').simulate('click', event);
    expect(props.handleInfoClick).toHaveBeenCalled();
  });
});
