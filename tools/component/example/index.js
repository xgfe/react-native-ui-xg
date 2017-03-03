/**
 * Created by #(AUTHOR)# on #(DATE)#.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import #(NAME)# from '../index';

export default class #(NAME)#Example extends Component {
  render() {
    return (
      <#(NAME)# style={styles.example}></#(NAME)#>
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
