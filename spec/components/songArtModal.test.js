/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from '../enzyme';
import 'window-or-global';
import SongArtModal from '../../client/components/SongArtModal.jsx';

describe('SongArtModal component', () => {
  let props = { };

  beforeEach(() => {
    props = {
      image: 'test.jpg',
      title: 'best song',
      artist: 'Lisa',
      onCloseRequest: jest.fn(),
    };
  });

  test('check props', () => {
    const component = shallow(<SongArtModal {...props} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(2);
    expect(component.prop('className')).toBe('player-art-modal-overlay');
    const p = Array.from(Object.keys(component.find('p').props()));
    expect(p.length).toBe(2);
    expect(component.find('p').prop('className')).toBe('player-art-modal-title');
    expect(component.find('p').prop('children')).toBe('best song - Lisa');
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<SongArtModal {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('respond to clicks on close button', () => {
    const component = shallow(<SongArtModal {...props} />);
    component.find('button').simulate('click');
    expect(props.onCloseRequest).toHaveBeenCalled();
  });

  // TODO: test for escaping modal
  // test('respond to modal close by escape', () => {
  //   shallow(<SongArtModal {...props} />, { attachTo: window });
  //   const keyboardEvent = window.createEvent("KeyboardEvent");
  //   window.simulate('keyup', { keyCode: 27 });
  //   expect(props.onCloseRequest).toHaveBeenCalled();
  // });
});
