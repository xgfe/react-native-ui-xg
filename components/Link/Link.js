import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Style, {IMG} from './LinkStyle';



class Link extends Component {

  skipIcon = {
    uri: IMG.skipIcon
  }

  // 构造
  constructor(props) {
    super(props);

    this.renderLabel = this.renderLabel.bind(this);
  }

  renderLabel(isColumnMode) {
    const {label, labelStyle, tips, value, placeholder, required} = this.props;

    if (typeof label === 'undefined') {
      return;
    }
    return (
      <View style={[Style.labelCon, isColumnMode && Style.columnModeLabelCon, !value && !placeholder && {width: null}]}>
        <Text style={[Style.label, labelStyle]}>{required && <Text style={[Style.required]}>*</Text>}{label}</Text>
        {!!tips && <Text style={Style.tips}>{tips}</Text>}
        {isColumnMode &&
        <Image
          style={Style.skipIcon}
          source={this.skipIcon}
          resizeMode="cover"
          />}
      </View>
    );
  }

  renderValue(isColumnMode) {
    const {value, placeholder} = this.props;

    if (!value && !placeholder) {
      return;
    }

    const valueStyles = [Style.input];

    if (placeholder && !value) {
      valueStyles.push({color: '#ccc'});
    }

    if (isColumnMode) {
      valueStyles.push(Style.columnModeInput);
    }

    return <Text style={valueStyles}>{value || placeholder}</Text>;
  }

  render() {
    const {
      multiline,
      error,
      wrapperStyle,
      errorStyle,
      label,
      tips,
      onPress,
      disabled
    } = this.props;

    const isColumnMode = multiline || !!tips;

    return (
      <TouchableHighlight onPress={onPress} underlayColor={'#eee'} disabled={disabled}>
        <View
          style={[
            Style.inputCon, wrapperStyle,
            isColumnMode && Style.multiInputCon,
            error && Style.error, error && errorStyle, disabled && Style.disabled
          ]}
        >
          {this.renderLabel(isColumnMode)}
          {this.renderValue(isColumnMode)}
          {isColumnMode ||
          <Image
            style={Style.skipIcon}
            source={this.skipIcon}
            resizeMode="cover"
            />}
          {error && <View style={[Style.lineBottom, Style.lineError]} />}
        </View>
      </TouchableHighlight>
    );
  }
}

Link.defaultProps = {
  multiline: false,
  error: false,
  disabled: false
};

Link.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  error: React.PropTypes.bool,
  required: React.PropTypes.bool,
  tips: React.PropTypes.string,
  wrapperStyle: React.PropTypes.object,
  errorStyle: React.PropTypes.object,
  labelStyle: React.PropTypes.object,
  onPress: React.PropTypes.func
};


export default Link;
