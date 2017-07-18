/**
 * Created by TinySymphony on 2017-04-10.
 */

import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';

import PressMenu from '../index';

export default class PressMenuExample extends Component {
  render() {
    return (
      <ScrollView>
        <PressMenu style={styles.example}>
          <View style={styles.container}><Text>sdfssdf</Text></View>
        </PressMenu>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 60
  },
  example: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
