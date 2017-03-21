import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React from 'react';
import {
  Text,
  Modal
} from 'react-native';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import Confirm from '../Confirm';
import Button from 'react-native-buttons';
import Input from 'react-native-input-xg';

console.error = function () {};

describe('test node', () => {
  it('check node number', () => {
    const wrapper = mount(<Confirm/>);
    expect(wrapper.find(Modal).length).toEqual(1);
    expect(wrapper.find(Input).length).toEqual(0);
    expect(wrapper.find(Button).length).toEqual(2);
  });
});

describe('test props', () => {

  it('check props', () => {
    const wrapper1 = mount(
      <Confirm
      title="age"
      confirmText="can't fix"
      cancelText = "cancel"
      />);
    expect(wrapper1.prop('title')).toEqual('age');
    expect(wrapper1.prop('confirmText')).toEqual("can't fix");
    expect(wrapper1.prop('cancelText')).toEqual('cancel');
  });
});

describe('test fun', () => {

  it('check open', () => {
    const wrapper1 = shallow(
      <Confirm
      title="age"
      confirmText="can't fix"
      cancelText = "cancel"
      />);
    let instance = wrapper1.instance();
    instance.open({title: 'age'});
    expect(wrapper1.state('title')).toEqual('age');
  });

  it('check onCancel', () => {
    let temp = false;
    const wrapper2 = shallow(
      <Confirm
      title="age"
      confirmText="can't fix"
      cancelText = "cancel"
      />);
    let instance = wrapper2.instance();
    instance._cacheOptions = {cancel: function(){temp = true;}};
    instance.onCancel();
    expect(temp).toEqual(true);
    expect(wrapper2.state('modalVisible')).toEqual(false);
  });

  it('checkout confirm', () => {
    let temp = false;
    const wrapper3 = shallow(
      <Confirm
      confirmText="can't fix"
      cancelText = "cancel"
      />);
    let instance = wrapper3.instance();
    instance._cacheOptions = {comment: 'good', confirm: function(){temp = true;}};
    instance.onConfirm();
    expect(temp).toEqual(true);

    let instance1 = wrapper3.instance();
    instance1._cacheOptions = {confirm: 't'};
    instance1.onConfirm();
    expect(wrapper3.state('modalVisible')).toEqual(false);
  });
});

describe('check branch', () => {
  it('check text and input', () => {
    const wrapper = shallow(
      <Confirm/>);
    let instance = wrapper.instance();
    instance.open({comment: 'test', text: 'tt'});
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find(Text).length).toEqual(1);
    let instance1 = wrapper.instance();
    instance1.open({confirm: () => {return true;}});
    instance1.onConfirm();
    expect(wrapper.state('modalVisible')).toEqual(true);

    let instance2 = wrapper.instance();
    instance2.open({confirm: () => {return Promise.resolve('a success');}});
    expect(wrapper.state('modalVisible')).toEqual(true);
    instance2.onConfirm();
  });
});


