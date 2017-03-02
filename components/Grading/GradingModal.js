/**
 * Created by TinySymphony on 2017-01-19.
 * @export GradingModal Component
 */

import React, {
  Component,
  PropTypes
} from 'react';
import {
  Text,
  View,
  Modal,
  Picker,
  Platform,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import styles, {Size, Color} from './GradingModalStyle';
import {MODE} from './GradingConstants';

export default class GradingModal extends Component {
  static propTypes = {
    scored: PropTypes.bool,
    scoreBase: PropTypes.number,
    visible: PropTypes.bool,
    onGrading: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    cancelTextStyle: PropTypes.object,
    confirmTextStyle: PropTypes.object,
    cancelButtonStyle: PropTypes.object,
    confirmButtonStyle: PropTypes.object
  }
  static defaultProps = {
    scored: false,
    scoreBase: 5,
    visible: false,
    onGrading: () => {},
    cancelText: 'Cancel',
    confirmText: 'Confirm'
  }
  constructor (props) {
    super(props);
    this.state = {
      score: this.props.score
    };
    this.isModalVisible = false;
    this.openModal = this.openModal.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onScrollChange = this.onScrollChange.bind(this);
  }
  setModalVisible (isModalVisible) {
    this.isModalVisible = isModalVisible;
    this.forceUpdate();
  }
  openModal () {
    this.setModalVisible(true);
  }
  onPressCancel () {
    this.setModalVisible(false);
  }
  onPressConfirm () {
    this.props.onGrading(this.state.score);
    this.setModalVisible(false);
  }
  onScrollChange (contentWidth, contentHeight) {
    let posY = ((this.state.score) * 10 - Size.offsetNum) * Size.itemHeight;
    if (!this.refs.scroll) {return;}
    this.refs.scroll.scrollTo({
      y: posY >= 0 ? posY : 0,
      x: 0
    });
  }
  render () {
    let {
      mode,
      isPercentage,
      scoreBase,
      confirmText,
      cancelText,
      cancelTextStyle,
      confirmTextStyle,
      cancelButtonStyle,
      confirmButtonStyle
    } = this.props;
    let selectArr = [];
    let i = 0;
    isPercentage = mode === MODE.ARCS && isPercentage;
    if (isPercentage) {
      while (++i <= scoreBase) {
        selectArr.push(i);
      }
    } else {
      while (++i <= scoreBase * 10) {
        selectArr.push(i);
      }
      selectArr = selectArr.map(item => item / 10);
    }
    return (
      <Modal
        transparent={true}
        visible={this.isModalVisible}
        onRequestClose={() => {}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              style={styles.modalMask}
              activeOpacity={1}
              underlayColor={Color.maskColor}
              onPress={this.onPressCancel}>
              <View style={styles.modalContainer}>
                <View style={styles.modal}>
                {Platform.OS === 'ios' &&
                  <View>
                    <Picker
                      selectedValue={this.state.score}
                      onValueChange={(value) => !this.props.scored && this.setState({score: value})}>
                      {selectArr.map(item =>
                        <Picker.Item label={isPercentage ? item + '%' : item.toFixed(1)} value={item} key={item}/>
                      )}
                    </Picker>
                  </View>
                }
                {Platform.OS === 'android' &&
                  <View style={styles.modalScroll}>
                    <ScrollView ref="scroll" onContentSizeChange={this.onScrollChange}>
                    {selectArr.map((item, index) =>
                      <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor="transparent"
                        key={'modal-item-' + index}
                        onPress={() => !this.props.scored && this.setState({score: item})}>
                        <View style={[styles.modalItem, this.state.score === item && styles.selectedItem]}>
                          <Text style={[styles.modalText, this.state.score === item && styles.selectedText]}>
                            {isPercentage ? item + '%' : item}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    )}
                    </ScrollView>
                  </View>
                }
                  <View style={styles.buttonView}>
                    <TouchableHighlight
                      activeOpacity={0.9}
                      underlayColor="transparent"
                      onPress={this.onPressCancel}>
                      <View style={[styles.modalButton, styles.cancelButton, cancelButtonStyle]}>
                        <Text style={[styles.buttonText, styles.cancelText, cancelTextStyle]}>{cancelText}</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.9}
                      underlayColor="transparent"
                      onPress={this.onPressConfirm}>
                      <View style={[styles.modalButton, styles.confirmButton, confirmButtonStyle]}>
                        <Text style={[styles.buttonText, styles.confirmText, confirmTextStyle]}>{confirmText}</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
      </Modal>
    );
  }
}
