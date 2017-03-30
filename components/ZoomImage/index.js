/**
 * Created by TinySymphony on 2017-03-23.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  PanResponder,
  NativeModules,
  findNodeHandle,
  TouchableWithoutFeedback
} from 'react-native';

const RCTUIManager = NativeModules.UIManager;

class ZoomImage extends Component {
  static defaultProps = {
  }
  static propTypes = {
  }
  constructor(props) {
    super(props);
    this.originSize = {
      width: 0,
      height: 0
    };
    this.isModalVisible = false;
    this.closeModal = this.closeModal.bind(this);
    this.zoomStart = this.zoomStart.bind(this);
    Image.getSize(this.props.source.uri, (w, h) => {
      this.originSize = {
        width: w,
        height: h
      };
    });
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  zoomStart() {
    if (!this.refs.view) return;
    RCTUIManager.measure(findNodeHandle(this.refs.view), (x, y, w, h, px, py) => {
      console.log(x, y, w, h, px, py);
    });
    this.isModalVisible = true;
    this.forceUpdate();
  }
  closeModal() {
    this.isModalVisible = false;
    this.forceUpdate();
  }
  render() {
    return (
      <TouchableWithoutFeedback style={this.props.imgStyle}
        onPress={this.zoomStart}
        ref="view">
        <View>
          <Image
            source={{uri: this.props.source.uri}}
            resizeMode={this.props.resizeMode}
            style={this.props.imgStyle}/>
          <ImageModal
            visible={this.isModalVisible}
            onClose={this.closeModal}
            size={this.originSize}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// TODO: twitter mode / wechat mode
class ImageModal extends Component {
  constructor(props) {
    super(props);
    this._modalStyle = {
      style: {

      }
    };
    this._modalImageStyle = {
      style: {

      }
    }
    this._touchPositionCheck = this._touchPositionCheck.bind(this);
    this._updateNativeStyles = this._updateNativeStyles.bind(this);
    this._pan = PanResponder.create({
      onStartShouldSetPanResponder: this._onStartShouldSetPanResponder.bind(this),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => this.props.startCapture,
      onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.props.moveCapture,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
  }
  _onStartShouldSetPanResponder (evt, gestureState) {
    // set responder for tapping when the drawer is open
    // TODO: tap close
    return true;
  }
  _onMoveShouldSetPanResponder (evt, gestureState) {
    // custom pan responder condition function
    console.log(1234123);
    if (this.props.responderNegotiate && this.props.responderNegotiate(evt, gestureState) === false) return false;
    if (this._touchPositionCheck(gestureState)) {
      return true;
    }
    return false;
  }
  _handlePanResponderGrant(evt, gestureState) {
  }
  _handlePanResponderMove (evt, gestureState) {
    let {
      dx,
      dy
    } = gestureState;
    this._modalStyle.style.left = dx;
    this._modalStyle.style.right = -dx;
    this._modalStyle.style.top = dy;
    this._modalStyle.style.bottom = -dy;
    this._updateNativeStyles()
    // dx === 0 triggers tap event when drawer is opened.
  }
  _handlePanResponderEnd (evt, gestureState) {
    gestureState.dx === 0 && this.props.onClose && this.props.onClose();
  }
  _touchPositionCheck(gestureState) {
    const {moveX, dx, dy} = gestureState;
    let x0 = moveX; // in move set panresponder state, moveX is the original point's coordinates
    console.log(dx, dy);
    if (Math.abs(dy) < Math.abs(dx)) return false;
    return true;
  }
  _updateNativeStyles() {
    this.mask && this.mask.setNativeProps(this._modalStyle);
  }
  render() {
    const {
      visible,
      onClose,
      size
    } = this.props;
    return (
      <Modal
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.modal} {...this._pan.panHandlers} ref={mask => {this.mask = mask;}}>
          <Text onPress={onClose} style={styles.modalText}>Close it</Text>
          <Text>{size.width + ' ' + size.height}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  modalImage: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  modalText: {
    color: '#fff'
  }
});

ZoomImage.ImageModal = ImageModal;

export default ZoomImage;
