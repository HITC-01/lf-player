/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongArt from '../../client/components/SongArt.jsx';

describe('SongArt component', () => {
  let props = { };

  beforeEach(() => {
    props = {
      songImage: 'test.jpg',
      songTitle: 'best song',
      songArtist: 'Lisa',
    };
  });

  test('check props', () => {
    const component = shallow(<SongArt {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('id')).toBe('player-display-album');
    const albumImg = Array.from(Object.keys(component.find('img').props()));
    expect(albumImg.length).toBe(2);
    expect(component.find('img').prop('src')).toBe(props.songImage);
    expect(component.find('img').prop('alt')).toBe('album-art');
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongArt {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to clicks on art', () => {
    const component = shallow(<SongArt {...props} />);
    expect(component.state('showModal')).toBe(false);
    component.find('a').simulate('click', {
      preventDefault: () => {},
    });
    expect(component.state('showModal')).toBe(true);
  });
});
