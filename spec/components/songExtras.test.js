/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import SongExtras from '../../client/components/SongExtras.jsx';

describe('SongExtras component', () => {
  let props = {};
  let event = {};

  beforeEach(() => {
    props = {
      playing: false,
      song: { tag: 'Blues', songAdded: Date.now() },
      handlePlayClick: jest.fn(),
      handleInfoClick: jest.fn(),
    };
    event = { preventDefault: () => {} };
  });

  test('check props', () => {
    const component = shallow(<SongExtras {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('className')).toBe('player-display-extras');
    const tag = Array.from(Object.keys(component.find('a').props()));
    expect(tag.length).toBe(4);
    expect(component.find('a').prop('className')).toBe('player-song-tag');
    expect(component.find('a').prop('href')).toBe('#');

    // spans with input info
    expect(component.find('span').prop('children')).toBe('# Blues');
    expect(component.find('h4').prop('children')).toBe('a few seconds ago');
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongExtras {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to clicks on genre tag', () => {
    const component = shallow(<SongExtras {...props} />);
    component.find('a').simulate('click', event);
    expect(props.handleInfoClick).toHaveBeenCalled();
  });
});
