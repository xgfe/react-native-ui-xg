/**
* Created by lulutia on 2017-03-31.
*/

import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 ActionSheetIOS
} from 'react-native';

export default class ActionSheetNewIOS extends Component {

  constructor(props) {
    super(props);
  }

  show() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: this.props.options,
      cancelButtonIndex: this.props.cancelButtonIndex,
      destructiveButtonIndex: this.props.destructiveButtonIndex,
      tintColor: this.props.tintColor,
      title: this.props.title,
      message: this.props.message
    }, this.props.callback);
  }
  render() {
    return null;
  }
}

ActionSheetNewIOS.defaultProps = {
  options: {},
  callback: () => {},
  failCallback: () => {},
  successCallback: () => {}
};

ActionSheetNewIOS.propTypes = {
  ...ActionSheetIOS.propTypes
};

