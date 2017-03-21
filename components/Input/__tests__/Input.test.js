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
import Input from '../Input';

console.error = function () {};

describe('test render snapshot', () => {
  const tree = renderer.create(
  	<Input />
  	).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test node', () => {
  it('check node number', () => {
    const wrapper = mount(<Input/>);
    expect(wrapper.find(Animated.View).length).toEqual(1);
    expect(wrapper.find(TextInput).length).toEqual(1);
  });
});

describe('test props', () => {
  it('check default props', () => {
    const wrapper = mount(
      <Input />);
    expect(wrapper.prop('multiline')).toEqual(false);
    expect(wrapper.prop('editable')).toEqual(true);
    expect(wrapper.prop('initJudge')).toEqual(true);
    expect(wrapper.prop('error')).toEqual(false);
    expect(wrapper.prop('readOnly')).toEqual(false);
  });

  it('check props', () => {
    const wrapper1 = mount(
      <Input
      label="age"
      tips="can't fix"
      readOnly
      defaultValue="12"
      />);
    expect(wrapper1.prop('label')).toEqual('age');
    expect(wrapper1.prop('tips')).toEqual("can't fix");
    expect(wrapper1.prop('defaultValue')).toEqual('12');
  });
});

describe('test branch', () => {
  it('check focuse', () => {
    const wrapper = mount(
      <Input
      />);

    expect(wrapper.find(TextInput).length).toEqual(1);
    wrapper.find(TextInput).simulate('focus');
    expect(wrapper.state('isFocus')).toEqual(true);
  });

  it('check blur', () => {
    const wrapper6 = mount(
      <Input
        autoFocus={true}
      />
    );
    wrapper6.find(TextInput).simulate('blur');
    expect(wrapper6.state('isFocus')).toEqual(false);
  });
  it('check require', () => {
    const wrapper1 = mount(
      <Input
      label="justfortest"
      required={false}
      />
      );
    const wrapper2 = mount(
      <Input
      label="justfortest"
      required
      />
      );
    expect(wrapper1.find(Text).length).toEqual(1);
    expect(wrapper2.find(Text).length).toEqual(2);
  });

  it('check tips', () => {
    const wrapper3 = mount(
      <Input
      label="justfortest"
      />
      );
    const wrapper4 = mount(
      <Input
      label="justfortest"
      tips={'test'}
      />
      );
    expect(wrapper3.find(Text).length).toEqual(1);
    expect(wrapper4.find(Text).length).toEqual(2);
  });

  it('check error', () => {
    const wrapper5 = mount(
      <Input
      label="test"
      error
      initJudge
      />
      );
    expect(wrapper5.find(View).length).toEqual(4);
  });
});

describe('check function', () => {
  it('check onFocus', () => {
    let errorT = false;
    const wrapper = mount(
      <Input
      error={errorT}
      onFocus={() => {errorT = true;}}
      />
      );
    wrapper.find(TextInput).simulate('focus');
    expect(errorT).toEqual(true);
  });

  it('check onBlur', () => {
    let temp = false;
    const wrapper1 = mount(
      <Input
      autoFocus={true}
      onBlur={() => {temp = true;}}
      />
      );
    wrapper1.find(TextInput).simulate('blur');
    expect(temp).toEqual(true);
  });

  it('check onChange', () => {
    let test = '';
    const wrapper2 = mount(
      <Input
      onChange={(text) => {test = 'finish';}}
      />
    );
    wrapper2.find(TextInput).simulate('change');
    expect(test).toEqual('finish');
  });

  it('check onContentSizeChange', () => {
    let temp = false;
    const wrapper3 = shallow(
      <Input
      label="triggerMe"
      onContentSizeChange={() => {temp = true;}}
      />
      );
    let instance = wrapper3.instance();
    instance.onContentSizeChange();
    expect(temp).toEqual(true);
  });

  it('check onPressLabel', () => {
    const wrapper4 = shallow(
      <Input
      label="triggerMe"
      editable={false}
      />
      );
    const wrapper5 = shallow(
      <Input
      label="triggerMe"
      readOnly
      />
      );
    let instance = wrapper4.instance();
    instance.onPressLabel();
    expect(wrapper4.state('isFocus')).toEqual(false);
    let instance1 = wrapper5.instance();
    instance1.onPressLabel();
    expect(wrapper5.state('isFocus')).toEqual(false);
  });

  it('check getContentSize', () => {
    const wrapper6 = shallow(
      <Input
      multiline
      />
    );
    let instance = wrapper6.instance();
    instance.setState({multiHeight: 10});
    instance.getContentSize({nativeEvent: {contentSize: {height: 20}}});
    expect(wrapper6.state('multiHeight')).toBeGreaterThan(10);
  });
});
