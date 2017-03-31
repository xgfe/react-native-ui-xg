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
        <View style={styles.content}>
          <Text style={styles.txt}>Zoom Image Examples! Try to click them~</Text>

          <View style={styles.imgItem}>
            <ZoomImage
              source={{uri: 'https://avatars2.githubusercontent.com/u/7685233?v=3&s=460'}}
              imgStyle={{width: 220, height: 220}}
              style={styles.img}
              />
          </View>

          <View style={styles.imgItem}>
            <ZoomImage
              source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
              imgStyle={{width: 250, height: 230}}
              style={styles.img}
              />
          </View>

          <View style={styles.imgItem}>
            <ZoomImage
              source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b28328.jpg'}}
              imgStyle={{width: 250, height: 240}}
              style={styles.img}
              />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontSize: 16,
    marginTop: 20,
    color: '#333'
  },
  img: {
    borderWidth: 3,
    borderColor: '#45b7d5'
  },
  imgItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});
