/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongDisplay from '../../client/components/SongDisplay.jsx';

describe('SongDisplay component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      playing: false,
      song: {
        albumImageUrl: 'test.jpg',
        title: 'test',
        artistName: 'Lisa',
      },
      handlePlayClick: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongDisplay {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('id')).toBe('player-display');

    const main = Array.from(Object.keys(component.find('SongMain').props()));
    expect(main.length).toBe(4);
    expect(component.find('SongMain').prop('playing')).toBe(false);

    const extras = Array.from(Object.keys(component.find('SongExtras').props()));
    expect(extras.length).toBe(2);
    expect(component.find('SongExtras').prop('song') instanceof Object).toBe(true);

    const art = Array.from(Object.keys(component.find('SongArt').props()));
    expect(art.length).toBe(3);
    expect(component.find('SongArt').prop('songImage')).toBe('test.jpg');
    expect(component.find('SongArt').prop('songTitle')).toBe('test');
    expect(component.find('SongArt').prop('songArtist')).toBe('Lisa');
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongDisplay {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
