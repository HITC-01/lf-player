/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from '../enzyme';
import SongComments from '../../client/components/SongComments.jsx';

describe('SongComments component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      comments: [
        {
          time: 10,
          artistName: 'Lisa',
          text: 'this song is great!',
          artistImageUrl: 'text.jpg',
        },
        {
          time: 30,
          artistName: 'Marlon',
          text: 'this song is awesome!',
          artistImageUrl: 'marlon.jpg',
        },
        {
          time: 66,
          artistName: 'Brenden',
          text: 'this song is cool!',
          artistImageUrl: 'brenden.jpg',
        },
        {
          time: 78,
          artistName: 'Glory',
          text: 'this song is glorious!',
          artistImageUrl: 'glory.jpg',
        },
      ],
      nowPlaying: -1,
      resetNowPLaying: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongComments {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('className')).toBe('player-comments');
    expect(component.prop('children').length).toBe(4);
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongComments {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
