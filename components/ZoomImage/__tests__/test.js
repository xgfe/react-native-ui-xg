/* eslint-disable */

import {
  View,
  Text,
  Easing,
  Dimensions,
  StyleSheet
} from 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import ZoomImage from '../index';
import Animation from '../Animation';

let {width, height, scale} = Dimensions.get('window');

const styles = StyleSheet.create({
  img: {
    borderWidth: 3,
    borderColor: '#45b7d5'
  }
});

let duration = 100;
let treeA = shallow(
  <ZoomImage
    source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
    imgStyle={{width: 250, height: 230}}
    style={styles.img}
    enableScaling={true}
  />
);

test('ZoomImage', (done) => {
  let instance = treeA.instance();
  instance.componentDidMount();
  expect(instance.enableModal).toEqual(false);
  expect(instance.getMaxSizeByRatio(1.4).width).toEqual(750);
  expect(instance.getMaxSizeByRatio(0.4).height).toEqual(1334);
  instance.openModal();
  instance.modalRefBind('modal');
  expect(instance._modal).toEqual('modal');
  done();
});

test('Animation works', (done) => {
  var animate = new Animation({
    start: 200,
    end: 10,
    onAnimationFrame: () => {
      expect(Animation.prototype.defaultEasing(3)).toEqual(3);
    },
    onAnimationEnd: done,
    duration: 200
  }).start(12313100000000);
});
