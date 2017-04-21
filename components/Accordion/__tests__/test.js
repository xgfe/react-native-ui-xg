/**
 * Created by lulutia on 2017-04-13.
 */

 /* eslint-disable */

import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import {
  View,
  ScrollView,
  Text
} from 'react-native';
import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';

import Accordion from '../Accordion';
import Collapse from '../Collapse';

console.error = function () {};

describe('test node', () => {
  it('check', () => {
    const items = [
      {
        name: "Gone with the Wind",
        description: "Gone with the Wind is a 1939 American epic historical romance film adapted from Margaret Mitchell's 1936 novel Gone with the Wind. It was produced by David O. Selznick of Selznick International Pictures and directed by Victor Fleming."
      },
      {
        name: "The Godfather",
        description: "The Godfather is a 1972 American crime film directed by Francis Ford Coppola and produced by Albert S. Ruddy, based on Mario Puzo's best-selling novel of the same name."
      },
      {
        name: "tesr",
        description: 'test'
      }
    ];

    function renderHeader(info) {
      return (
        <View>
          <Text>{info}</Text>
        </View>
      );
    }

    function renderContent(info) {
      return (
        <View>
          <Text>{info}</Text>
        </View>
      );
    }

    const wrapper = shallow(<Accordion
      items = {items}
      headerRender = {renderHeader}
      contentRender = {renderContent}
      headerName = "name"
      contentName = "description"/>);
    let instance = wrapper.instance();
    expect(wrapper.state('activeItem')).toEqual(undefined);
    instance._toggle(2);
    expect(wrapper.state('activeItem')).toEqual(2);
    instance._toggle(2);
    expect(wrapper.state('activeItem')).toEqual(undefined);
  });
});

describe('test collapse', ()=>{
  it ('check basic', ()=>{
    const wrapper = mount(<Collapse/>);
    const wrapper1 = shallow(<Collapse />);
    let instance = wrapper1.instance();
    expect(instance.contentInit).toEqual(false);
    instance.getContentHeight({nativeEvent:{layout:{height: 80}}});
    expect(instance.contentInit).toEqual(true);
  })
})

