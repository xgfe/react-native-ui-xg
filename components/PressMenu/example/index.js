/**
 * Created by TinySymphony on 2017-04-10.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import PressMenu from '../index';

export default class PressMenuExample extends Component {
  render() {
    return (
      <PressMenu style={styles.example} />
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
