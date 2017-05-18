/**
 * Created by TinySymphony on 2017-05-17.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import CalendarSelect from '../index';

export default class CalendarSelectExample extends Component {
  constructor(props) {
    super(props);
    this.calendar = null;
    this.state = {
      startDate: new Date(2017, 7, 12),
      endDate: new Date(2017, 8, 23)
    };
    this.openCalendar = this.openCalendar.bind(this);
    this.confirmDate = this.confirmDate.bind(this);
  }
  confirmDate ({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }
  openCalendar() {
    this.refs.cal && this.refs.cal.open();
  }
  render() {
    let color = {
      mainColor: '#138691'
    };
    const {
      startDate,
      endDate
    } = this.state;
    let text = startDate && endDate ? startDate.toLocaleDateString() + '  ---  ' + endDate.toLocaleDateString() :
      'Please select a period';
    return (
      <View style={styles.example}>
        <TouchableHighlight
          style={styles.btn}
          title="press"
          onPress={this.openCalendar}
          >
          <Text style={styles.btnFont}>Choose start & end Time</Text>
        </TouchableHighlight>
        <View>
          <Text style={styles.font}>{text}</Text>
        </View>
        <CalendarSelect
          i18n="en"
          color={color}
          ref="cal"
          format="YYYYMMDD"
          minDate="20170510"
          maxDate="20180412"
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onConfirm={this.confirmDate}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden',
    borderRadius: 6,
    marginBottom: 30,
    backgroundColor: '#db9c0e'
  },
  btnFont: {
    color: '#fff',
    fontSize: 20
  },
  font: {
    fontSize: 24,
    fontWeight: '500',
    color: '#4c575c'
  }
});
