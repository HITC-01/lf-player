/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import SongBarEntry from '../../client/components/SongBarEntry.jsx';

describe('SongBarEntry component', () => {
  test('Should render correctly', () => {
    const component = renderer.create(<SongBarEntry />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
