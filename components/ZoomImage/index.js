/**
 * Created by TinySymphony on 2017-03-23.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Easing,
  StyleSheet,
  PanResponder,
  NativeModules,
  findNodeHandle,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import Animation from './Animation';
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const winRatio = winWidth / winHeight;

const RCTUIManager = NativeModules.UIManager;

class ZoomImage extends Component {
  static propTypes = {
    startCapture: PropTypes.bool,
    moveCapture: PropTypes.bool,
    responderNegotiate: PropTypes.func,
    easingFunc: PropTypes.func,
    duration: PropTypes.number,
    enableScaling: PropTypes.bool
  }
  static defaultProps = {
    startCapture: false,
    moveCapture: false,
    duration: 800,
    easingFunc: Easing.ease,
    enableScaling: false
  }
  constructor(props) {
    super(props);
    this.state = {
      maxSize: {
        width: 0,
        height: 0
      },
      isModalVisible: false
    };
    this.enableModal = false;
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    Image.getSize(this.props.source.uri, (w, h) => {
      let ratio = w / h;
      this.setState((state) => {
        state.maxSize = {
          width: ratio >= winRatio ? winWidth : winWidth / ratio,
          height: ratio >= winRatio ? winWidth / ratio : winHeight
        };
        this.enableModal = true;
      });
    });
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  openModal() {
    if (!this.refs.view || !this.enableModal) return;
    RCTUIManager.measure(findNodeHandle(this.refs.view), (x, y, w, h, px, py) => {
      this.originPosition = {x, y, w, h, px, py};
    });
    this.setState({
      isModalVisible: true
    });
  }
  closeModal() {
    this.setState({
      isModalVisible: false
    });
  }
  render() {
    return (
      <TouchableWithoutFeedback style={this.props.imgStyle}
        onPress={this.openModal}
        ref="view">
        <View style={this.props.style}>
          <Image
            source={this.props.source}
            resizeMode={this.props.resizeMode}
            style={this.props.imgStyle}/>
          <ImageModal
            visible={this.state.isModalVisible}
            onClose={this.closeModal}
            originPosition={this.originPosition}
            size={this.state.maxSize}
            minAlpha={this.props.minAlpha}
            source={this.props.source}
            duration={this.props.duration}/>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this._initModalStyle = {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 1)'
      }
    };
    this._modalStyle = JSON.parse(JSON.stringify(this._initModalStyle));
    this._initContentStyle = {
      style: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    };
    this._contentStyle = JSON.parse(JSON.stringify(this._initContentStyle));
    this._initImgSize = {
      style: this.props.size
    };
    this._imgSize = JSON.parse(JSON.stringify(this._initImgSize));
    this._inAnimation = false;
    this._setNativeProps = this._setNativeProps.bind(this);
    this._closeModalByTap = this._closeModalByTap.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._rebounce = this._rebounce.bind(this);
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
    if (this._inAnimation) return;
    return false;
  }
  _onMoveShouldSetPanResponder (evt, gestureState) {
    // custom pan responder condition function
    if (this._inAnimation) return;
    if (this.props.responderNegotiate && this.props.responderNegotiate(evt, gestureState) === false) return false;
    if (this._touchPositionCheck(gestureState)) {
      return true;
    }
    return false;
  }
  _handlePanResponderGrant(evt, gestureState) {
  }
  _handlePanResponderMove (evt, gestureState) {
    const {dy} = gestureState;
    this._updateNativeStyles(dy);
  }
  _handlePanResponderEnd (evt, gestureState) {
    const {dy} = gestureState;
    if (dy > 0.4 * winHeight) {
      this._closeModal(true);
    } else if (-dy > 0.4 * winHeight) {
      this._closeModal(false);
    } else {
      this._rebounce();
    }
  }
  _touchPositionCheck(gestureState) {
    const {dx, dy} = gestureState;
    if (Math.abs(dy) <= Math.abs(dx)) {
      return false;
    }
    return true;
  }
  _closeModal(isDown) {
    const {easingFunc, onClose} = this.props;
    let current = this._contentStyle.style.top;
    this._inAnimation = true;
    new Animation({
      start: current,
      end: isDown ? winHeight : -winHeight,
      duration: 140,
      easingFunc,
      onAnimationFrame: (val) => {
        this._updateNativeStyles(val);
      },
      onAnimationEnd: () => {
        this._inAnimation = false;
        onClose();
        this._setNativeProps(true);
      }
    }).start();
  }
  _closeModalByTap() {
    if (this._inAnimation) {
      return false;
    }
    this._closeModal(true);
  }
  _rebounce(isDown) {
    const {duration, easingFunc} = this.props;
    let current = this._contentStyle.style.top;
    this._inAnimation = true;
    new Animation({
      start: current,
      end: 0,
      duration: Math.abs(current / winHeight) * duration,
      easingFunc,
      onAnimationFrame: (val) => {
        this._updateNativeStyles(val);
      },
      onAnimationEnd: () => {
        this._inAnimation = false;
      }
    }).start();
  }
  _updateNativeStyles(dy) {
    const {
      width,
      height
    } = this.props.size;
    // this._contentStyle.style.left = dx;
    // this._contentStyle.style.right = -dx;
    this._contentStyle.style.top = dy;
    this._contentStyle.style.bottom = -dy;
    this._modalStyle.style.backgroundColor = `rgba(0, 0, 0, ${1 - Math.abs(dy) / winHeight * 0.9})`;
    if (this.props.enableScaling) {
      this._imgSize.style.width = width * (1 - Math.abs(dy / winHeight) * 0.6);
      this._imgSize.style.height = height * (1 - Math.abs(dy / winHeight) * 0.6);
    } else {
      this._imgSize.style.width = width;
      this._imgSize.style.height = height;
    }
    this._setNativeProps();
  }
  _setNativeProps(isReset) {
    if (isReset) {
      this._contentStyle = JSON.parse(JSON.stringify(this._initContentStyle));
      this._modalStyle = JSON.parse(JSON.stringify(this._initModalStyle));
      this._imgSize = JSON.parse(JSON.stringify(this._initImgSize));
    }
    this.content && this.content.setNativeProps(this._contentStyle);
    this.mask && this.mask.setNativeProps(this._modalStyle);
    this.img && this.img.setNativeProps(this._imgSize);
  }
  componentDidUpdate () {
    new Animation({
      start: 0,
      end: 1,
      duration: 100,
      easingFunc: Easing.ease,
      onAnimationFrame: (val) => {
        this.mask && this.mask.setNativeProps({style: {
          opacity: val
        }});
      },
      onAnimationEnd: () => {
        this._inAnimation = false;
      }
    }).start();
  }
  render () {
    const {
      visible,
      onClose,
      source,
      size  // origin size of the image
    } = this.props;
    if (visible) { this._inAnimation = true; }
    this._initImgSize.style = size;
    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.mask} ref={mask => {this.mask = mask;}} {...this._pan.panHandlers}>
          <TouchableWithoutFeedback
            ref={ref => {this.imgContainer = ref;}}
            onPress={this._closeModalByTap}>
            <View
              ref={ref => {this.content = ref;}}
              style={styles.content}>
              <Image ref={img => {this.img = img;}} source={source} style={[size, styles.img]}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 0
  },
  content: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  toucharea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  modalText: {
    color: '#fff'
  },
  img: {
  }
});

ZoomImage.ImageModal = ImageModal;

export default ZoomImage;
