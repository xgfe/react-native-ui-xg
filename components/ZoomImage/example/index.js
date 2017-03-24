/**
 * Created by TinySymphony on 2017-03-23.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import ZoomImage from '../index';

export default class ZoomImageExample extends Component {
  render() {
    return (
      <ZoomImage style={styles.example}></ZoomImage>
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
