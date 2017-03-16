import React, {Component} from 'react';
import {
  Text,
  View,
  Modal
} from 'react-native';
import Style from './ConfirmStyle';
import Button from 'react-native-buttons';
import Input from 'react-native-input-xg';

class Confirm extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      modalVisible: false,
      title: null,
      text: null,
      content: null,
      comment: null,
      commentRequired: false,
      disableCancel: false,
      confirmText: '确定',
      cancelText: '取消'
    };

    this.open = this.open.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  open(options) {
    const {
      title = null, text = null, content = null, comment = null,
      commentRequired = false, disableCancel = false, confirmText = '确定', cancelText = '取消'
    } = options;

    this._cacheOptions = options;

    this.setState({
      title,
      text,
      content,
      comment: undefined,
      commentPlaceholder: comment,
      commentRequired,
      modalVisible: true,
      disableCancel,
      confirmText,
      cancelText
    });
  }

  onCancel() {
    const {cancel} = this._cacheOptions;

    if (typeof cancel === 'function') {
      cancel();
    }

    this._cacheOptions = null;
    this.setState({
      modalVisible: false
    });
  }

  onConfirm() {
    const {comment = null, confirm} = this._cacheOptions;
    let confirmResult = false;

    if (typeof confirm === 'function') {
      confirmResult = confirm(comment ? {
        comment: this.state.comment
      } : undefined);
    }

    // 返回值false时关闭弹窗, 返回true不做处理
    if (!confirmResult) {
      this.setState({
        modalVisible: false
      });
    } else if (confirmResult instanceof Promise) {
      // 返回Promise时, promise成功后关闭
      confirmResult.then(() => {
        this.setState({
          modalVisible: false
        });
      });
    } else {
      return undefined;
    }
  }

  render() {
    const {
      title, text, content, confirmText, cancelText, comment, commentPlaceholder, modalVisible, commentRequired, disableCancel
    } = this.state;

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
          <View style={Style.body}>
            {title && <View style={Style.title}>
              <Text style={Style.outerView}>{title}</Text>
            </View>}
            <View style={Style.content}>
              {text && <Text style={Style.subText}>{text}</Text>}
              {content}
              {commentPlaceholder &&
              <Input wrapperStyle={{marginTop: 5}}
                onChangeText={(inputText) => this.setState({
                  comment: inputText
                })}
                placeholder={commentPlaceholder}
              />}
            </View>

            <View style={Style.innerView}>
              {!disableCancel &&
              <Button
                theme="gray"
                selfStyle={[Style.footerBtn]}
                size="default"
                onPress={this.onCancel}>{cancelText}</Button>}
              <Button
                theme="orange"
                selfStyle={[Style.footerBtn]}
                disabled={commentRequired && !comment}
                onPress={this.onConfirm}
              >{confirmText}</Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Confirm;
