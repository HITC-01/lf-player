/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from '../enzyme';
import SongCommentsEntry from '../../client/components/SongCommentsEntry.jsx';

describe('SongCommentsEntry component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      comment: {
        time: 10,
        artistName: 'Lisa',
        text: 'this song is great!',
        artistImageUrl: 'text.jpg',
      },
      nowPlaying: true,
      resetNowPLaying: jest.fn(),
      handleReply: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongCommentsEntry {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(5);
    expect(component.prop('className')).toBe('player-comment-single');
    expect(component.prop('onMouseEnter') instanceof Function).toBe(true);
    expect(component.prop('onMouseLeave') instanceof Function).toBe(true);
    expect(component.prop('style')).toBeTruthy();

    const image = Array.from(Object.keys(component.find('img').props()));
    expect(image.length).toBe(4);
    expect(component.find('img').prop('src')).toBe('text.jpg');
    expect(component.find('img').prop('className').includes('player-comment-image-')).toBe(true);
    expect(component.find('img').prop('onClick') instanceof Function).toBe(true);

    const name = Array.from(Object.keys(component.find('.player-comment-artist').props()));
    expect(name.length).toBe(2);
    expect(component.find('.player-comment-artist').prop('children').includes(`${props.comment.artistName}`)).toBe(true);
    const text = Array.from(Object.keys(component.find('.player-comment-text').props()));
    expect(text.length).toBe(2);
    expect(component.find('.player-comment-text').prop('children').includes(`${props.comment.text}`)).toBe(true);
  });

  test('check left rendered image', () => {
    props.comment.time = 90;
    const component = shallow(<SongCommentsEntry {...props} />);
    expect(component.find('.player-comment-left')).toBeTruthy();
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongCommentsEntry {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to hover on comment image', () => {
    const instance = mount(<SongCommentsEntry {...props} />);
    instance.simulate('mouseenter');
    expect(instance.state('show')).toBe(true);
  });

  test('respond to hover exit', () => {
    const instance = mount(<SongCommentsEntry {...props} />);
    instance.simulate('mouseenter');
    expect(instance.state('show')).toBe(true);
    instance.simulate('mouseleave');
    expect(instance.state('show')).toBe(false);
  });
});
