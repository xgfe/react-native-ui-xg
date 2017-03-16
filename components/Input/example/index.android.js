/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Input from '../Input';

export default class input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test1: '',
      test2: '12',
      test3: '',
      test4: '',
      test5: '',
      test6: '',
      test7: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Input label="name" value={this.state.test1} placeholder="基本input" onChangeText={(text) => {
          console.debug('trsy');
          this.setState({test1: text});
        }}/>
        <Input label="age" defaultValue={this.state.test2} placeholder="请输入年龄" editable={false}/>
        <Input label="readOnly age" tips={"can't fix"} readOnly defaultValue={this.state.test2} placeholder="加入提示文案"/>
        <Input label="hobby" required value={this.state.test3} placeholder="必选项" onChangeText={(text) => {
          this.setState({test3: text});
        }}/>
        <Input label="description" value={this.state.test4} placeholder="label过长时自动换行" onChangeText={(text) => {
          this.setState({test4: text});
        }}/>
        <Input label="address" multiline value={this.state.test5} placeholder="多行输入" onChangeText={(text) => {
          this.setState({test5: text});
        }}/>
        <Input label="error" error initJudge value={this.state.test6} placeholder="内容为error的状态，可定制" onChangeText={(text) => {
          this.setState({test6: text});
        }}/>
         <Input label="style"
          labelStyle={{color: '#96e4da'}}
          focusStyle={{backgroundColor: '#eee'}}
          wrapperStyle={{marginTop: 10}}
          value={this.state.test7} placeholder="style的定制" onChangeText={(text) => {
            this.setState({test7: text});
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

AppRegistry.registerComponent('input', () => input);
