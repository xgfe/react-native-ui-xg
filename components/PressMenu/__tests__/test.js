/**
 * Created by TinySymphony on 2017-04-10.
 */

 /* eslint-disable */

import {
  View
} from 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import PressMenu from '../index';

let tree = shallow(<PressMenu/>);

it('PressMenu renders correctly', () => {
  let instance = tree.instance();
  expect(instance.longPressTimeout).toEqual(null);
});
