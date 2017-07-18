import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import styles from './HomeStyle';
import {scenes} from './registerScreens';

export default class Home extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.navigation = this.navigation.bind(this);
  }

  navigation(key) {
    this.props.navigator.push({
      screen: key,
      title: key,
      animationType: 'slide-horizontal'
    })
  }

  render() {
    let listStr = [];
    for (let key in scenes) {
      if (key === 'Home') {
        continue;
      }

      listStr.push(
        <TouchableHighlight underlayColor="lightcyan" onPress={() => this.navigation(key)} key={key}>
          <View style={styles.listItem}>
            <Image source={require('./res/logo.png')} style={styles.logo}/>
            <View style={styles.itemBody}>
              <Text style={styles.itemText}>{key}</Text>
              <Image style={styles.right} source={require('./res/right.png')}/>
            </View>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>React Native UI xg</Text>
        <View style={styles.listView}>
          {listStr}
        </View>
      </ScrollView>
    );
  }
}
