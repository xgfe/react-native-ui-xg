import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  Navigator
} from 'react-native';
import CustomNavigationBarStyles from './CustomNavigationBarStyles';
import styles from './HomeStyle';
import listData from './config';

export default class reactNativeUiXg extends Component {
  // 构造
  constructor(props) {
    super(props);

    // 初始状态
    this.state = {title: 'Home'};
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(route, navigator) {
    this.navigator = navigator;

    if (listData[route.key]) {
      const Com = listData[route.key];
      this.state.title = route.key;
      return <Com />;
    }

    this.state.title = 'Home';
    let listStr = [];
    for (let key in listData) {
      listStr.push(
        <TouchableHighlight underlayColor="lightcyan" onPress={() => this.navigator.push({key})} key={key}>
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

  render() {
    return (
      <Navigator
        initialRoute={{key: 'home'}}
        renderScene={this.renderContent}
        sceneStyle={styles.sceneStyle}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={CustomNavigationBarStyles}
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                return (
                  <TouchableHighlight style={styles.back} underlayColor="lightcyan" onPress={this.navigator.pop}>
                    <Text style={styles.backText}>Back</Text>
                  </TouchableHighlight>
                );
              },
              RightButton: (route, navigator, index, navState) => {},
              Title: (route, navigator, index, navState) => {
                return (
                  <View style={styles.navTitle}>
                    <Text style={styles.navTitleText}>{this.state.title}</Text>
                  </View>
                );
              }
            }}
            style={styles.navigationBar}
          />
        }
      />
    );
  }
}
