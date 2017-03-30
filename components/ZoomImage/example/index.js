/**
 * Created by TinySymphony on 2017-03-23.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import ZoomImage from '../index';


export default class ZoomImageExample extends Component {
  constructor(props) {
    super(props);
    this.text = '';
  }
  render() {
    return (
      <ScrollView>
        <ZoomImage
          source={{uri: 'https://avatars2.githubusercontent.com/u/7685233?v=3&s=460'}}
          imgStyle={{width: 200, height: 140}}
          />
        <ZoomImage
          source={{uri: 'https://avatars2.githubusercontent.com/u/7685233?v=3&s=460'}}
          imgStyle={{width: 100, height: 290}}
          />
        <ZoomImage
          source={{uri: 'https://avatars2.githubusercontent.com/u/7685233?v=3&s=460'}}
          imgStyle={{width: 320, height: 240}}
          />
        <ZoomImage
          source={{uri: 'https://avatars2.githubusercontent.com/u/7685233?v=3&s=460'}}
          imgStyle={{width: 200, height: 240}}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    marginTop: 40,
    marginBottom: 40
  }
});
