/**
 * Created by lulutia on 2017-03-31.
 */

 /* eslint-disable */
import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
global.cancelAnimationFrame = () => {};
import {
  View,
  Modal,
  Platform,
  TouchableHighlight,
  ActionSheetIOS
} from 'react-native';
import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import ActionSheet from '../actionSheetAndroid';
import ActionsheetIOS from '../actionSheetIOS';
ActionSheetIOS.showActionSheetWithOptions = () => {};


describe('test node', () => {
  it('check node number', () => {
    const wrapper = mount(<ActionSheet />);
    expect(wrapper.find(Modal).length).toEqual(1);
    const wrapper1 = mount(<ActionsheetIOS />);
    expect(wrapper1.find(Modal).length).toEqual(0);
  })
})

describe('test begin', () => {
  it('check show', () => {
    let BUTTONS = [
      'Option 0',
      'Option 1',
      'Option 2',
      'Delete',
      'Cancel'
    ];

    let DESTRUCTIVE_INDEX = 3;
    let CANCEL_INDEX = 4;
    let temp = false;
    const wrapper = shallow(
      <ActionSheet
        tintColor = {'green'}
        title={'title'}
        message={'message'}
        options = {BUTTONS}
        cancelButtonIndex = {CANCEL_INDEX}
        destructiveButtonIndex = {DESTRUCTIVE_INDEX}
        callback = {(buttonIndex) => {
          temp = true;
        }}
      />
      );
    const wrapper1 = shallow(
      <ActionsheetIOS
        tintColor = {'green'}
        title={'title'}
        message={'message'}
        options = {BUTTONS}
        cancelButtonIndex = {CANCEL_INDEX}
        destructiveButtonIndex = {DESTRUCTIVE_INDEX}
        callback = {(buttonIndex) => {
          temp = true;
        }}
      />
      );
    let instance = wrapper.instance();
    let instance1 = wrapper.instance();
    let instance2 = wrapper1.instance();

    expect(wrapper.state('modalVisible')).toEqual(false);
    instance.show();
    expect(wrapper.state('modalVisible')).toEqual(true);
    wrapper.find(TouchableHighlight).first().simulate('press');
    instance1.finishChose(2);
    expect(temp).toEqual(true);

    instance2.show();
  })
})


