import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes} from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import Link from '../Link';

console.error = function () {};

describe('test node', () => {
  it('check node number', () => {
    const wrapper = mount(<Link/>);
    expect(wrapper.find(Animated.View).length).toEqual(0);
    expect(wrapper.find(TextInput).length).toEqual(0);
  });
});

describe('test props', () => {
  it('check default props', () => {
    const wrapper = mount(
      <Link />);
    expect(wrapper.prop('multiline')).toEqual(false);
    expect(wrapper.prop('error')).toEqual(false);
    expect(wrapper.prop('disabled')).toEqual(false);
  });

  it('check props', () => {
    const wrapper1 = mount(
      <Link
      label="age"
      tips="can't fix"
      />);
    expect(wrapper1.prop('label')).toEqual('age');
    expect(wrapper1.prop('tips')).toEqual("can't fix");
  });
});

describe('test branch', () => {


  it('check require', () => {
    const wrapper1 = mount(
      <Link
      label="justfortest"
      required={false}
      />
      );
    const wrapper2 = mount(
      <Link
      label="justfortest"
      required
      />
      );
    expect(wrapper1.find(Text).length).toEqual(1);
    expect(wrapper2.find(Text).length).toEqual(2);
  });

  it('check tips', () => {
    const wrapper3 = mount(
      <Link
      label="justfortest"
      />
      );
    const wrapper4 = mount(
      <Link
      label="justfortest"
      tips={'test'}
      placeholder={'now'}
      />
      );
    expect(wrapper3.find(Text).length).toEqual(1);
    expect(wrapper4.find(Text).length).toEqual(3);
  });

  it('check error', () => {
    const wrapper5 = mount(
      <Link
      label="test"
      error
      initJudge
      />
      );
    expect(wrapper5.find(View).length).toEqual(4);
  });
});

describe('check function', () => {

});
