/**
* Created by lulutia on 2017-03-31.
*/

import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Modal,
 Dimensions,
 Animated,
 ScrollView,
 TouchableHighlight,
 Text,
 Easing
} from 'react-native';


/**
 * 全局变量声明
 */
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

// 实际视口高度, 25：status bar height
let REALWINDOWHEIGHT = height - 25;


export default class ActionSheetAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(REALWINDOWHEIGHT)
    };
    this.renderData = [];
    this.handleData = this.handleData.bind(this);
    this.choseItem = this.choseItem.bind(this);
  }



  show() {
    this._setModalVisible(true);
  }

  _setModalVisible(visible, index) {
    let itemHeight = Math.min(this.WHOLEACTIONHEIGHT, this.MAXACTIONHEIGHT);

    if (visible) {
      this.setState({modalVisible: visible});
      Animated.timing(
        this.state.animatedHeight,
        {toValue: Math.max(REALWINDOWHEIGHT - itemHeight - 10, 10),
          delay: 100,
          easing: Easing.bezier(0.48, 0.25, 0.25, 0.87),
          duration: 200
        }
      ).start();
    } else {
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height}
      ).start(() => {this.finishChose(index);});
    }
  }

  choseItem(index) {
    this._setModalVisible(false, index);
  }

  finishChose(index) {
    if (this.props.callback) {
      this.props.callback(index);
    }
    this.setState({modalVisible: false});
  }
  handleData() {
    const {
      options,
      cancelButtonIndex,
      title
    } = this.props;
    let itemLength;

    // 实际的
    this.MAXACTIONHEIGHT = REALWINDOWHEIGHT - 20;
    // 数据的

    title ? itemLength = this.props.options.length + 1 : this.props.options.length;
    this.props.cancelButtonIndex ? (this.WHOLEACTIONHEIGHT = itemLength * 45 + 10) : (this.WHOLEACTIONHEIGHT = itemLength * 45);
    this.renderData = [];
    options.map((item, index) => {
      this.renderData.push({item: item, index: index});
    });
    if (cancelButtonIndex && options.length >= (cancelButtonIndex + 1)) {
      this.renderData.splice(cancelButtonIndex, 1);
    }
  }


  render() {
    const {
      modalVisible
    } = this.state;

    const {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      tintColor,
      title,
      message
    } = this.props;

    this.handleData();

    return (
      <Modal
        animationType={'none'}
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          console.debug('close');
        }}
      >
        <View style={Style.wrapper}>
          <Animated.View style={[Style.body, {top: this.state.animatedHeight}]}>
            <View style={[Style.hackWrapper,
              !cancelButtonIndex && Style.hackCancelStyle,
              (this.WHOLEACTIONHEIGHT < this.MAXACTIONHEIGHT) && Style.border]}>
              {
                title && (
                  <View style={[Style.itemContainer, Style.titleBorder]}>
                    <Text style={Style.title}>{title}</Text>
                    <Text>{message}</Text>
                  </View>
                )
              }
            <ScrollView style = {Style.itemGroup}>
            {
              this.renderData.map((item, index) => {
                return (
                  <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0.2)'}
                  key={index}
                  activeOpacit={0.6}
                  onPress={() => {this.choseItem(item.index);}}>
                    <View style={[Style.itemContainer,
                      Style.itemBorder,
                      (index === this.renderData.length - 1) &&
                      (this.WHOLEACTIONHEIGHT < this.MAXACTIONHEIGHT) && Style.hackItemBorder
                    ]}>
                      <Text style={[
                        Style.itemText, tintColor && {color: tintColor},
                        destructiveButtonIndex === item.index && Style.deleteText]}>
                        {item.item}
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              })
            }
            </ScrollView>
            </View>
            {typeof cancelButtonIndex === 'number' && (
              <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2)'}
              onPress={() => {this.choseItem(cancelButtonIndex);}} >
                <View style={[Style.itemCancel,
                  (this.WHOLEACTIONHEIGHT < this.MAXACTIONHEIGHT) && Style.border]}>
                    <Text style={[Style.itemText, Style.cancelText, tintColor && {color: tintColor}]}>{options[cancelButtonIndex]}</Text>
                </View>
              </TouchableHighlight>
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  body: {
    width: width - 20
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 45
  },
  itemCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 10,
    backgroundColor: '#fff',
    height: 45
  },
  itemGroup: {
    width: width - 20
  },
  hackWrapper: {
    // todo wait for the official
    //borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    maxHeight: height - 25 - 20 - 45 - 10
  },
  hackCancelStyle: {
    maxHeight: height - 25 - 20
  },
  itemText: {
    fontSize: 16
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  deleteText: {
    color: 'red'
  },
  border: {
    borderRadius: 12
  },
  hackItemBorder: {
    borderBottomColor: 'rgba(0,0,0,0)'
  },
  titleBorder: {
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  title: {
    fontSize: 16,
    fontWeight: '500'
  },
  cancelText: {
    fontWeight: '500'
  }
});

ActionSheetAndroid.defaultProps = {
  options: [],
  callback: () => {},
  failCallback: () => {},
  successCallback: () => {}
};
