/**
 * Created by TinySymphony on 2017-04-10.
 */

import React, {PropTypes, Component} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  PanResponder
} from 'react-native';

class PressMenu extends Component {
  static defaultProps = {
    startCapture: true,
    moveCapture: true
  }
  static propTypes = {
    startCapture: PropTypes.bool,
    moveCapture: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this.longPressTimeout = null;
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true
    });
    this._pan = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true
    });
  }
  _handleStartShouldSetPanResponder (e: Object, gestureState: Object) {
    // Should we become active when the user presses down on the circle?
    clearTimeout(this.longPressTimeout);
    this.longPressTimeout = setTimeout(() => {
      this.setState({
        isModalVisible: true
      });
    }, 1000);
    return true;
  }
  _handleMoveShouldSetPanResponder (e: Object, gestureState: Object) {
    return false;
  }
  _handlePanResponderGrant (e: Object, gestureState: Object) {
  }
  _handlePanResponderMove (e: Object, gestureState: Object) {
  }
  _handlePanResponderEnd (e: Object, gestureState: Object) {
    console.log('end', e.target);
    clearTimeout(this.longPressTimeout);
  }
  openModal () {
    this.setState({
      isModalVisible: true
    });
  }
  closeModal () {
    this.setState({
      isModalVisible: false
    });
  }
  render() {
    return (
      <View style={styles.container}
        ref="view"
        {...this._panResponder.panHandlers}>
        {this.props.children}
        <Modal
          visible={this.state.isModalVisible}
          transparent={true}
          {...this._pan.panHandlers}>
          <View style={styles.mask}>
            {this.props.children}
          </View>
        </Modal>
      </View>
    );
  }
}

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
}

PressMenu.MeunItem = MenuItem;
export default PressMenu;

const styles = StyleSheet.create({
  container: {
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.86)'
  }
});
