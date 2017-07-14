import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';

import styles from './HomeStyle';
import {scenes} from './registerScreens';

export default class Home extends Component {
  render() {
    let listStr = [];
    for (let key in scenes) {
      listStr.push(
        <TouchableHighlight underlayColor="lightcyan" onPress={() => this.props.navigator.push({screen: key, title: key,  animationType: 'slide-horizontal',
})} key={key}>
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{key}</Text>
            <Image style={styles.right} source={require('./res/right.png')}/>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>React Native UI xg Demos!</Text>
        <View style={styles.listView}>
          {listStr}
        </View>
      </ScrollView>
    );
  }
}
