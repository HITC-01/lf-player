/* eslint-env jest */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from '../enzyme';
import 'isomorphic-fetch';
import 'window-or-global';
import Player from '../../client/components/Player.jsx';

describe('Player component', () => {
  const url = `http://localhost:${process.env.PORT || 3004}`;
  test('check props', () => {
    const component = shallow(<Player url={url} />);
    const propsOut = Array.from(Object.keys(component.props()));
    expect(propsOut.length).toBe(3);
    expect(component.prop('id')).toBe('player-all');
    expect(component.prop('className')).toBeTruthy();

    const display = Array.from(Object.keys(component.find('SongDisplay').props()));
    expect(display.length).toBe(3);
    expect(component.find('SongDisplay').prop('song') instanceof Object).toBe(true);
    expect(component.find('SongDisplay').prop('playing')).toBe(false);
    expect(component.find('SongDisplay').prop('handlePlayClick') instanceof Function).toBe(true);

    const comments = Array.from(Object.keys(component.find('SongTracker').props()));
    expect(comments.length).toBe(7);
    expect(component.find('SongTracker').prop('songProfile') instanceof Object).toBe(true);
    expect(component.find('SongTracker').prop('playState') instanceof Object).toBe(true);
    expect(component.find('SongTracker').prop('comments') instanceof Object).toBe(true);
    expect(component.find('SongTracker').prop('nowPlaying')).toBe(-1);
    expect(component.find('SongTracker').prop('resetNowPLaying') instanceof Function).toBe(true);
    expect(component.find('SongTracker').prop('handleScan') instanceof Function).toBe(true);
    expect(component.find('SongTracker').prop('handleBarClick') instanceof Function).toBe(true);
  });

  test('render basic snapshot', () => {
    const tree = renderer
      .create(<Player url={url} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('method: handleBarClick', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.playState.totalTime = 300;
    instance.handleBarClick(0.75);
    const { playState } = instance.state;
    expect(playState.playing).toBe(true);
    expect(playState.currentTime).toBe(225);
  });

  test('method: handlePlayClick with time input', () => {
    const instance = mount(<Player url={url} />).instance();
    const newTime = 220;
    instance.state.playState.totalTime = 300;
    instance.handlePlayClick(newTime);
    const { playState } = instance.state;
    expect(playState.playing).toBe(true);
    expect(playState.hovering).toBe(false);
    expect(playState.currentTime).toBe(newTime);
  });

  test('method: handlePlayClick play simulation', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.playState.totalTime = 300;
    instance.handlePlayClick();
    const { playState } = instance.state;
    expect(playState.playing).toBe(true);
    expect(playState.hovering).toBe(false);
  });

  test('method: handlePlayClick play simulation', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.playState.totalTime = 300;
    instance.state.playState.playing = true;
    instance.handlePlayClick();
    const { playState } = instance.state;
    expect(playState.playing).toBe(false);
    expect(playState.hovering).toBe(false);
  });

  test('method: handleBarScan', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.handleBarScan(true, 0.5);
    const { playState } = instance.state;
    expect(playState.playing).toBe(false);
    expect(playState.hovering).toBe(true);
    expect(playState.hoverPosition).toBe(0.5);
  });

  test('method: handleBarScan 2', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.handleBarScan(false, 0.5);
    const { playState } = instance.state;
    expect(playState.hovering).toBe(false);
    expect(playState.hoverPosition).toBe(null);
  });

  test('method: play', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.play();
    expect(instance.intervalId).not.toBe(null);
  });

  test('method: pause', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.play();
    expect(instance.intervalId).not.toBe(null);
    instance.pause();
    expect(instance.intervalId).toBe(null);
  });

  test('method: count', () => {
    const instance = mount(<Player url={url} />).instance();
    expect(instance.intervalId).toBe(null);
    instance.count();
    const { playState } = instance.state;
    expect(playState.currentTime).toBe(1);
  });

  test('method: count on end', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.playState.currentTime = 2;
    instance.count();
    const { playState } = instance.state;
    expect(playState.currentTime).toBe(1);
    expect(playState.playing).toBe(false);
  });

  test('method: getComments', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.getComments(0);
    const { comments } = instance.state;
    expect(comments).not.toBe([]);
  });

  test('method: findNowPlaying when commentHover is false', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.state.songTimes = { 20: 0, 40: 1, 50: 2 };
    const nowPlaying = instance.findNowPlaying(20);
    expect(nowPlaying[0]).toBe(20);
    expect(nowPlaying[1]).toBe(0);
  });

  test('method: findNowPlaying when commentHover is false, still in tRange', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.state.songTimes = { 20: 0, 40: 1, 50: 2 };
    const nowPlaying = instance.findNowPlaying(22);
    expect(nowPlaying[0]).toBe(20);
    expect(nowPlaying[1]).toBe(0);
  });

  test('method: findNowPlaying when commentHover is false, out of tRange', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.state.songTimes = { 20: 0, 40: 1, 50: 2 };
    const nowPlaying = instance.findNowPlaying(25);
    expect(nowPlaying[0]).toBe(null);
    expect(nowPlaying[1]).toBe(-1);
  });

  test('method: findNowPlaying when commentHover is true', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.state.commentHover = true;
    instance.state.songTimes = { 20: 0, 40: 1, 50: 2 };
    const nowPlaying = instance.findNowPlaying(40);
    expect(nowPlaying[0]).toBe(20);
    expect(nowPlaying[1]).toBe(0);
  });

  test('method: resetNowPlaying with false hover', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.resetNowPLaying();
    const { nowPlaying, commentHover } = instance.state;
    expect(nowPlaying[0]).toBe(null);
    expect(nowPlaying[1]).toBe(-1);
    expect(commentHover).toBe(false);
  });

  test('method: resetNowPlaying with true hover', () => {
    const instance = mount(<Player url={url} />).instance();
    instance.state.nowPlaying = [20, 0];
    instance.resetNowPLaying(true);
    const { nowPlaying, commentHover } = instance.state;
    expect(nowPlaying[0]).toBe(null);
    expect(nowPlaying[1]).toBe(-1);
    expect(commentHover).toBe(true);
  });
});
