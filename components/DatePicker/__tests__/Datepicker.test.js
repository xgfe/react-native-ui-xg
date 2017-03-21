import React from 'react';
import {Platform, Animated, DatePickerAndroid, Modal} from 'react-native';
import {shallow, mount} from 'enzyme';
import Moment from 'moment';
import DatePicker from '../Datepicker.js';

/*----------------------------------------------------- mock DOM -----------------------------------------------------*/
import {jsdom} from 'jsdom';
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.window.location = {'host': 'localhost', 'protocol': 'http'};

global.navigator = {
  userAgent: 'node.js'
};

global.ErrorUtils = {
  setGlobalHandler: () => {}
};

global.cancelAnimationFrame = () => {};
/*----------------------------------------------------- mock DOM -----------------------------------------------------*/

console.error = function () {};


describe('DatePicker', () => {

  it('initialize', () => {
    const wrapper = mount(<DatePicker />);

    expect(wrapper.prop('mode')).toEqual('date');
    expect(wrapper.prop('duration')).toEqual(300);
    expect(wrapper.prop('height')).toBeGreaterThan(200);
    expect(wrapper.prop('confirmBtnText')).toEqual('确定');
    expect(wrapper.prop('cancelBtnText')).toEqual('取消');
    expect(wrapper.prop('customStyles')).toMatchObject({});
    expect(wrapper.prop('showIcon')).toEqual(true);
    expect(wrapper.prop('disabled')).toEqual(false);

    expect(wrapper.state('date')).toBeInstanceOf(Date);
    expect(wrapper.state('modalVisible')).toEqual(false);
    expect(wrapper.state('animatedHeight')).toBeInstanceOf(Animated.Value);

    const wrapper1 = mount(
      <DatePicker
        date="2016-05-11"
        format="YYYY/MM/DD"
        mode="datetime"
        duration={400}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={{}}
        customStyles={{testStyle: 123}}
        disabled={true}
        showIcon={false}
      />
    );

    expect(wrapper1.prop('mode')).toEqual('datetime');
    expect(wrapper1.prop('format')).toEqual('YYYY/MM/DD');
    expect(wrapper1.prop('duration')).toEqual(400);
    expect(wrapper1.prop('confirmBtnText')).toEqual('Confirm');
    expect(wrapper1.prop('cancelBtnText')).toEqual('Cancel');
    expect(wrapper1.prop('iconSource')).toMatchObject({});
    expect(wrapper1.prop('customStyles')).toMatchObject({testStyle: 123});
    expect(wrapper1.prop('showIcon')).toEqual(false);
    expect(wrapper1.prop('disabled')).toEqual(true);

    expect(wrapper1.state('date')).toMatchObject(Moment('2016-05-11', 'YYYY-MM-DD').toDate());

    // find not work with mount, and defaultProps not work with shallow...
    const wrapper2 = shallow(<DatePicker date={new Date('2016/09/09')}/>);
    expect(wrapper2.instance().getDateStr()).toEqual('2016-09-09');

    const wrapper3 = shallow(<DatePicker showIcon={false} date={{test: 123}}/>);
    expect(wrapper3.find('Image').length).toEqual(0);
    expect(wrapper3.instance().getDateStr()).toEqual('Invalid date');
  });

  it('default selected Date', () => {
    var dateStr = null;
    const wrapper = shallow(<DatePicker date="" onDateChange={(date) => {
      dateStr = date;
    }}/>);
    const datePicker = wrapper.instance();

    datePicker.onPressConfirm();

    expect(dateStr).toEqual(Moment().format('YYYY-MM-DD'));
  });

  it('default selected Date with minDate and maxDate', () => {
    var dateStr = null;
    var dateStrMax = null;
    var dateStrNormal = null;

    const wrapper = shallow(<DatePicker date="" minDate="3000-09-09" onDateChange={(date) => {
      dateStr = date;
    }}/>);
    const datePicker = wrapper.instance();

    datePicker.onPressConfirm();

    expect(dateStr).toEqual('3000-09-09');


    const wrapperMax = shallow(<DatePicker date="" maxDate="2016-07-07" onDateChange={(date) => {
      dateStrMax = date;
    }}/>);
    const datePickerMax = wrapperMax.instance();

    datePickerMax.onPressConfirm();

    expect(dateStrMax).toEqual('2016-07-07');


    const wrapperNormal = shallow(
      <DatePicker date="" minDate="2016-07-07" maxDate="3000-09-09" onDateChange={(date) => {dateStrNormal = date;}}/>
    );
    const datePickerNormal = wrapperNormal.instance();

    datePickerNormal.onPressConfirm();

    expect(dateStrNormal).toEqual(Moment().format('YYYY-MM-DD'));
  });

  it('setModalVisible', () => {
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();

    datePicker.setModalVisible(true);

    expect(wrapper.state('modalVisible')).toEqual(true);
    expect(wrapper.state('animatedHeight')._animation._toValue).toBeGreaterThan(200);

    datePicker.setModalVisible(false);
    expect(wrapper.state('animatedHeight')._animation._toValue).toEqual(0);
  });

  it('onPressCancel', () => {
    const setModalVisible = jest.fn();
    const onCloseModal = jest.fn();
    const wrapper = shallow(<DatePicker onCloseModal={onCloseModal}/>);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    datePicker.onPressCancel();

    expect(setModalVisible).toHaveBeenCalledWith(false);
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('onPressConfirm', () => {
    const setModalVisible = jest.fn();
    const datePicked = jest.fn();
    const onCloseModal = jest.fn();
    const wrapper = shallow(<DatePicker onCloseModal={onCloseModal}/>);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;
    datePicker.datePicked = datePicked;

    datePicker.onPressConfirm();

    expect(setModalVisible).toHaveBeenCalledWith(false);
    expect(datePicked).toHaveBeenCalledTimes(1);
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('getDate', () => {
    const wrapper = shallow(<DatePicker date="2016-06-04"/>);
    const datePicker = wrapper.instance();

    expect(datePicker.getDate()).toMatchObject(Moment('2016-06-04', 'YYYY-MM-DD').toDate());
    expect(datePicker.getDate('2016-06-06')).toMatchObject(Moment('2016-06-06', 'YYYY-MM-DD').toDate());

    const date = new Date();
    expect(datePicker.getDate(date)).toEqual(date);
  });

  it('getDateStr', () => {
    const wrapper = shallow(<DatePicker date="2016-06-01"/>);
    const datePicker = wrapper.instance();

    expect(datePicker.getDateStr()).toEqual('2016-06-01');
    expect(datePicker.getDateStr(new Date('2016-06-02'))).toEqual('2016-06-02');
    expect(datePicker.getDateStr('2016-06-03')).toEqual('2016-06-03');

    wrapper.setProps({format: 'YYYY/MM/DD'});
    expect(datePicker.getDateStr(new Date('2016-06-02'))).toEqual('2016/06/02');
  });

  it('datePicked', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();
    const date = new Date('2016-06-06');
    wrapper.setState({date});

    datePicker.datePicked();

    expect(onDateChange).toHaveBeenCalledWith('2016-06-06', date);
  });

  it('onDatePicked', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onDatePicked({action: DatePickerAndroid.dismissedAction, year: 2016, month: 5, day: 12});
    datePicker.onDatePicked({action: '', year: 2016, month: 5, day: 12});

    expect(wrapper.state('date')).toMatchObject(new Date(2016, 5, 12));
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });

  it('onTimePicked', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onTimePicked({action: DatePickerAndroid.dismissedAction, hour: 12, minute: 10});
    datePicker.onTimePicked({action: '', hour: 12, minute: 10});

    expect(wrapper.state('date').getHours()).toEqual(12);
    expect(wrapper.state('date').getMinutes()).toEqual(10);
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });

  it('onDatetimeTimePicked', () => {
    const onDateChange = jest.fn();
    const wrapper = shallow(<DatePicker onDateChange={onDateChange}/>);
    const datePicker = wrapper.instance();

    datePicker.onDatetimePicked({action: DatePickerAndroid.dismissedAction, year: 2016, month: 12, day: 12});
    datePicker.onDatetimePicked({action: '', year: 2016, month: 12, day: 12});
    datePicker.onDatetimeTimePicked(2016, 6, 1, {action: DatePickerAndroid.dismissedAction, hour: 12, minute: 10});
    datePicker.onDatetimeTimePicked(2016, 6, 1, {action: '', hour: 12, minute: 10});

    expect(wrapper.state('date').getFullYear()).toEqual(2016);
    expect(wrapper.state('date').getMonth()).toEqual(6);
    expect(wrapper.state('date').getDate()).toEqual(1);
    expect(wrapper.state('date').getHours()).toEqual(12);
    expect(wrapper.state('date').getMinutes()).toEqual(10);
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });

  it('onPressDate', () => {
    Platform.OS = 'ios';
    const setModalVisible = jest.fn();
    const onOpenModal = jest.fn();
    const wrapper = shallow(
      <DatePicker date="2016-05-06" minDate="2016-04-01" maxDate="2016-06-01" onOpenModal={onOpenModal}/>
    );
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    wrapper.setProps({disabled: true});
    datePicker.onPressDate();

    expect(setModalVisible).toHaveBeenCalledTimes(0);

    wrapper.setProps({disabled: false});
    datePicker.onPressDate();
    expect(wrapper.state('date')).toMatchObject(datePicker.getDate());
    expect(setModalVisible).toHaveBeenCalledTimes(1);
    expect(onOpenModal).toHaveBeenCalledTimes(1);

    Platform.OS = 'android';
    expect(datePicker.onPressDate).not.toThrow(Error);

    wrapper.setProps({mode: 'datetime'});
    expect(datePicker.onPressDate).not.toThrow(Error);

    wrapper.setProps({mode: 'time'});
    expect(datePicker.onPressDate).not.toThrow(Error);

    wrapper.setProps({mode: 'tttt'});
    expect(datePicker.onPressDate).toThrow(Error);
  });

  it('panResponder', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<DatePicker date="2016-05-06" minDate="2016-04-01" maxDate="2016-06-01"/>);
    const datePicker = wrapper.instance();

    datePicker.onPressDate();

    expect(datePicker.onStartShouldSetResponder()).toEqual(true);
    expect(datePicker.onMoveShouldSetResponder()).toEqual(true);

    expect(datePicker.props.modalOnResponderTerminationRequest()).toEqual(true);
  });

  it('getTitleElement - with placeholder', () => {
    const placeholder = 'Please pick a date';
    const wrapper = mount(<DatePicker placeholder={placeholder} />);
    const datePicker = wrapper.instance();

    expect(datePicker.getTitleElement().props.children).toEqual(placeholder);
  });

  it('getTitleElement - without placeholder', () => {
    const wrapper = mount(<DatePicker date="2016-06-04" />);
    const datePicker = wrapper.instance();

    expect(datePicker.getTitleElement().props.children).toEqual(datePicker.getDateStr());
  });

  it('`date` prop changes', () => {
    const wrapper = mount(<DatePicker date="2016-06-04" />);
    
    expect(wrapper.state('date')).toMatchObject(new Date(2016, 5, 4));

    wrapper.setProps({date: '2016-06-05'});

    expect(wrapper.state('date')).toMatchObject(new Date(2016, 5, 5));
  });
});

describe('Coverage', () => {

  it('Event: onRequestClose', () => {
    Platform.OS = 'ios';
    const setModalVisible = jest.fn();
    const wrapper = shallow(<DatePicker />);
    const datePicker = wrapper.instance();
    datePicker.setModalVisible = setModalVisible;

    wrapper.find(Modal).simulate('requestClose');

    expect(setModalVisible).toHaveBeenCalledTimes(1);
  });

  it('Event: onDateChange', () => {
    Platform.OS = 'ios';
    const wrapper = shallow(<DatePicker />);

    wrapper.find('DatePickerIOS').simulate('dateChange');
  });
});
