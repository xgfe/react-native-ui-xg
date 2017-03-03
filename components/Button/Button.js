import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight,
  ActivityIndicator,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {
  ButtonType,
  ButtonOuter,
  BasicColor
} from './ButtonStyle';

import {judgePlatformLevel} from './judge';

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.renderChildren = this._renderChildren.bind(this);
  }

  _renderChildren(size, color) {
    const {
      children = '',
      isLoading = false,
      disabled = false,
      loadingTitle = 'Loading',
      active = false
    } = this.props;
    let childrenNode = [];
    if (isLoading) {
      let loadingSize = size;
      if (loadingSize === 'default') {loadingSize = 'small';}
      return <View style={[{'flexDirection': 'row'}, this.props.innerStyle]}>
        <ActivityIndicator
          animating={true}
          color={color.loadColor}
          size={loadingSize}/>
        <Text style={[color.textColor,
          {marginLeft: 5},
          (active && color.activeTextColorCSS),
          (disabled || isLoading) && color.disableTextColorCSS]}>
          {loadingTitle}
        </Text>
      </View>;
    } else {
      React.Children.forEach(children, function (item) {
        if (React.isValidElement(item)) {
          childrenNode.push(item);
        } else if (typeof item === 'string' || item === 'number') {
          const node = (<Text
            style={[ButtonType[size],
              color.textColor,
              (active && color.activeTextColorCSS),
              (disabled || isLoading) && color.disableTextColorCSS]}
            key={item}>
            {item}
          </Text>);
          childrenNode.push(node);
        }
      });
      return <View style={[{'flexDirection': 'row'}, this.props.innerStyle]}>{childrenNode}</View>;
    }
  }

  render() {
    const {
      theme = 'default',
      type = 'surface',
      size = 'default',
      disabled = false,
      isLoading = false,
      disableColor = '',
      activeColor = '',
      loadingColor = '',
      active = false
    } = this.props;
    let colorConfig = new BasicColor(theme, type, disableColor, activeColor, loadingColor);
    let handleProps = (!disabled && !isLoading) ? this.props : null;

    if (!judgePlatformLevel('TouchableNativeFeedback') || disabled || isLoading) {
      return (
        <TouchableHighlight
          style={[ButtonOuter.btn,
            ButtonOuter[size],
            colorConfig.themeColor,
            this.props.selfStyle,
            active && colorConfig.activeColorCSS,
            (disabled || isLoading) && colorConfig.disableColorCSS]}
          underlayColor={type === 'surface' ? colorConfig.activeColor : '#EEE'}
          {...this.props}
          disabled={disabled || isLoading}
        >
          {this._renderChildren(size, colorConfig)}
        </TouchableHighlight>
      );
    }
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(colorConfig.disableColor)}
        {...handleProps}
      >
        <View
          style={[ButtonOuter.btn,
            ButtonOuter[size],
            colorConfig.themeColor,
            this.props.selfStyle,
            active && colorConfig.activeColorCSS,
            (disabled || isLoading) && colorConfig.disableColorCSS]}>
          {this._renderChildren(size, colorConfig)}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  theme: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOf(['default', 'small', 'large']),
  type: React.PropTypes.oneOf(['ghost', 'surface'])
};

export default Button;
