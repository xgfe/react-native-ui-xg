/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Link from '../Link';


class Banna extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Link label="必填项" required
        onPress={() => {
          this.props.navigator.push({
            key: '必填项'
          });
        }}
        />
        <Link disabled
          onPress={() => {
            this.props.navigator.push({
              key: '无法操作'
            });
          }}
          label="无法操作"
        />
        <Link
          onPress={() => {
            this.props.navigator.pop();
          }}
          label="页面弹出(回退一页)"
        />
        <Link tips={'回退到最后一页'}
          onPress={() => {
            this.props.navigator.popToTop();
          }}
          label="页面弹出"
          value={'现在的值是：the value is blabla now'}
        />
      </View>
    );
  }
}
export default class link extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
      <Navigator
        initialRoute={{key: 'initPage初始页'}}
        sceneStyle={{flex: 1, backgroundColor: 'white'}}
        renderScene={(route, navigator) =>
          <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', margin: 20}}>{route.key}</Text>
          <Banna
            navigator={navigator}
            key={route.key}
          />
          </View>
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

