/**
 * Created by lulutia on 2017-03-31.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import ActionSheet from '../index';

let BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel'
];

let DESTRUCTIVE_INDEX = 3;
let CANCEL_INDEX = 4;

export default class ActionSheetExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 'none',
      text: ''
    };
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    this.refs.action1.show();
  }


  render() {

    return (
      <View style={styles.container}>
        <Text onPress={this.showActionSheet} style={styles.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
        <ActionSheet
          tintColor = {'green'}
          title={'title'}
          message={'message'}
          options = {BUTTONS}
          cancelButtonIndex = {CANCEL_INDEX}
          destructiveButtonIndex = {DESTRUCTIVE_INDEX}
          callback = {(buttonIndex) => {
            this.setState({clicked: BUTTONS[buttonIndex]});
          }}
          ref = "action1"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  button: {
    marginBottom: 10,
    fontWeight: '500'
  },
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
