import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';
import Style from './InputStyle';

import StyleSheet from 'react-native-stylesheet-xg';

/** RichInput
 * @example
 * <RichInput label="姓名" value="" placeholder="请输入姓名" onChangeText={(text) => {}}}/>
 * @props
 *    @extends TextInput
 *    label
 *    tips
 *    error
 */

const ANIMATION_TIME = 300;
// 末尾留余高度
const PLUS_HEIGHT = StyleSheet.r(20);
// 最小高度，末尾留余高度，防抖动
const MULTI_MIN_HEIGHT = StyleSheet.r(40) + PLUS_HEIGHT;
// 校正
const REVISES = {
  ios: StyleSheet.r(20),
  android: 0
};

class Input extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isFocus: false,
      multiHeight: MULTI_MIN_HEIGHT + REVISES[Platform.OS],
      animatedFactor: new Animated.Value(0.0001)
    };

    this.lineAnimated = {
      transform: [
        {scaleX: this.state.animatedFactor}
      ]
    };

    this.focusInit = false;

    this.renderLabel = this.renderLabel.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPressLabel = this.onPressLabel.bind(this);
    this.getContentSize = this.getContentSize.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  onFocus() {
    const {onFocus} = this.props;

    this.focusInit = true;
    this.setState({
      isFocus: true
    });

    Animated.timing(
      this.state.animatedFactor,
      {
        duration: ANIMATION_TIME,
        toValue: 1
      }
    ).start();

    if (typeof onFocus === 'function') {
      onFocus();
    }
  }

  onBlur() {
    const {onBlur} = this.props;

    this.setState({
      isFocus: false
    });

    Animated.timing(
      this.state.animatedFactor,
      {
        duration: ANIMATION_TIME,
        toValue: 0.0001
      }
    ).start();

    if (typeof onBlur === 'function') {
      onBlur();
    }
  }

  getContentSize(event) {
    if (this.props.multiline) {
      const newHeight = Math.max(
        MULTI_MIN_HEIGHT,
        event.nativeEvent.contentSize.height + PLUS_HEIGHT + REVISES[Platform.OS]
      );


      if (newHeight !== this.state.multiHeight) {
        this.setState({multiHeight: newHeight});
      }
    }
  }

  onChange(event) {
    const {onChange} = this.props;

    this.getContentSize(event);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }

  onContentSizeChange(event) {
    const {onContentSizeChange} = this.props;

    this.getContentSize(event);

    if (typeof onContentSizeChange === 'function') {
      onContentSizeChange(event);
    }
  }

  onPressLabel() {
    const {editable, readOnly} = this.props;

    if (editable && !readOnly) {
      this.input.focus();
    }
  }

  renderLabel() {
    const {label, labelStyle, multiline, tips, required} = this.props;
    const isColumnMode = multiline || !!tips || (label ? label.length > 5 : false);

    if (typeof label === 'undefined') {
      return;
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPressLabel}>
        <View style={[Style.labelCon, isColumnMode && Style.columnModeLabelCon]}>
          <Text style={[Style.label, labelStyle]}>
            {required && <Text style={[Style.required]}>*</Text>}{label}
          </Text>
          {!!tips && <Text style={Style.tips}>{tips}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {
      editable,
      multiline,
      error,
      wrapperStyle,
      focusStyle,
      disabledStyle,
      errorStyle,
      initJudge,
      readOnly,
      label,
      tips
    } = this.props;
    const {isFocus} = this.state;
    const isColumnMode = multiline || !!tips || (label ? label.length > 5 : false);

    return (
      <View
        style={[
          Style.inputCon, wrapperStyle,
          isColumnMode && Style.multiInputCon,
          isFocus && Style.focus, isFocus && focusStyle,
          initJudge && (error && Style.error), initJudge && (error && errorStyle),
          !initJudge && (error && this.focusInit && Style.error), !initJudge && (error && errorStyle),
          !editable && Style.disabled, !editable && disabledStyle
        ]}
      >
        {this.renderLabel()}
        <TextInput
          placeholderTextColor={'#ccc'}
          underlineColorAndroid={'transparent'}
          returnKeyType={'done'}
          {...this.props}
          editable={editable && !readOnly}
          ref={input => this.input = input}
          style={[
            Style.input, isColumnMode && Style.columnModeInput,
            this.props.style,
            multiline && Style.multiInput,
            multiline && {height: this.state.multiHeight}
          ]}
          onContentSizeChange={this.onContentSizeChange}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <Animated.View style={[Style.lineBottom, this.lineAnimated]} />
        {error && <View style={[Style.lineBottom, Style.lineError]} />}
      </View>
    );
  }
}

Input.defaultProps = {
  editable: true,
  multiline: false,
  error: false,
  initJudge: true,
  readOnly: false
};

Input.propTypes = {
  ...TextInput.propTypes,
  label: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  editable: React.PropTypes.bool,
  multiline: React.PropTypes.bool,
  error: React.PropTypes.bool,
  required: React.PropTypes.bool,
  tips: React.PropTypes.string,
  wrapperStyle: React.PropTypes.object,
  focusStyle: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  errorStyle: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  initJudge: React.PropTypes.bool,
  readOnly: React.PropTypes.bool
};


export default Input;
