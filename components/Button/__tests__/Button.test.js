import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes} from 'react';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import {shallow, mount} from 'enzyme';
import Button from '../Button';

describe('TEST PROPS', () => {
  it('check the props', () => {
    const wrapper = shallow(<Button type="surface" size="small" theme="orange" onPress={() => {}}>test</Button>);
    expect(wrapper.props().type).toEqual('surface');
    expect(wrapper.props().size).toEqual('small');
    expect(wrapper.props().theme).toEqual('orange');
  });

  it('check loading', () => {
    const wrapper1 = shallow(
      <Button
        type="surface"
        size="default"
        theme="orange"
        isLoading={true}
        loadingTitle="正在加载"
        disableColor="#00C5CD"
        onPress={() => {}}
        loadingColor="rgba(221,106,167,0.8)">test</Button>
    );
    expect(wrapper1.props().loadingTitle).toEqual('正在加载');
    expect(wrapper1.props().isLoading).toEqual(true);
    expect(wrapper1.find(ActivityIndicator).props().size).toEqual('small');
  });

  it('check active', () => {
    Platform.Version = 20;
    const wrapper2 = shallow(
      <Button
        selfStyle={{marginTop: 450}}
        theme="blue"
        size="default"
        active={true}
        onPress={() => {}}>default</Button>
    );
    expect(wrapper2.find(TouchableHighlight).props().disabled).toEqual(false);
    expect(wrapper2.find(TouchableNativeFeedback).length).toEqual(0);
  });

  it('check platform', () => {
    Platform.Version = 23;
    TouchableNativeFeedback.Ripple = function(){};
    const wrapper3 = shallow(
      <Button
        selfStyle={{marginTop: 450}}
        type="ghost"
        theme="#BA55D3"
        size="default"
        active={true}
        onPress={() => {}}>default</Button>
    );

    // TODO
    // expect(wrapper3.find(TouchableHighlight).length).toEqual(0);
    // expect(wrapper3.find(TouchableNativeFeedback).length).toEqual(1);
  });
});
