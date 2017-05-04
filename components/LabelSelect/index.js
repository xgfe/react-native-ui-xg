/**
 * Created by TinySymphony on 2017-01-03.
 */

import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import Styles, {IMG} from './LabelSelectStyle';

class LabelSelect extends Component {
  addIcon = {
    uri: IMG.addIcon
  }
  static propTypes = {
    title: PropTypes.string,
    readOnly: PropTypes.bool,
    enable: PropTypes.bool,
    onConfirm: PropTypes.func,
    enableAddBtn: PropTypes.bool,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  }
  static defaultProps = {
    style: {},
    customStyle: {},
    title: ' ',
    enable: true,
    readOnly: false,
    onConfirm: () => {},
    enableAddBtn: true,
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  }
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isModalVisible: false
    };
    this.selectedList = [];
    this.toggleSelect = this.toggleSelect.bind(this);
    this.cancelSelect = this.cancelSelect.bind(this);
    this.confirmSelect = this.confirmSelect.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  setModalVisible(isVisible) {
    this.setState({isModalVisible: isVisible});
  }
  cancelSelect() {
    this.selectedList = [];
    this.setModalVisible(false);
  }
  confirmSelect() {
    const {onConfirm} = this.props;
    onConfirm(this.selectedList);
    this.selectedList = [];
    this.cancelSelect();
  }
  openModal() {
    if (!React.Children.toArray(this.props.children).filter(item => item.type === ModalItem).length) {
      // TODO
    }
    this.props.enable && !this.props.readOnly && this.setModalVisible(true);
  }
  toggleSelect(time) {
    let index = this.selectedList.findIndex(item => item === time);
    if (~index) {this.selectedList.splice(index, 1);}
    else {this.selectedList.push(time);}
  }
  render() {
    const {
      readOnly,
      enable,
      title,
      style,
      enableAddBtn,
      customStyle,
      confirmText,
      cancelText
    } = this.props;
    let selectedLabels = React.Children.toArray(this.props.children)
      .filter(item => item.type === Label)
      .map((child, index) => {
        return React.cloneElement(child, {
          enable: enable,
          readOnly: readOnly
        });
      });

    let modalItems = this.state.isModalVisible ? React.Children.toArray(this.props.children)
      .filter(item => item.type === ModalItem)
      .map((child, index) => {
        return React.cloneElement(child, {
          toggleSelect: this.toggleSelect
        });
      }) : null;

    return (
      <View style={[Styles.selectedView, style]}>
        {selectedLabels}
        {enable && !readOnly && enableAddBtn &&
          <TouchableHighlight
            style={[Styles.selectedItem, Styles.addItem]}
            underlayColor="transparent"
            onPress={this.openModal}>
            <Image
              style={Styles.addIcon}
              source={this.addIcon}
              resizeMode="cover"
              />
          </TouchableHighlight>
        }
        <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {}}>
          <View style={{flex: 1}}>
            <TouchableHighlight
              style={Styles.modalMask}
              activeOpacity={1}
              underlayColor="#00000077"
              onPress={this.cancelSelect}>
              <View style={Styles.modalContainer}>
                <View style={[Styles.modal, customStyle.modal || {}]}>
                  <View style={Styles.title}><Text style={Styles.titleText}>{title}</Text></View>
                  <View style={Styles.scrollView}>
                    <ScrollView>
                      {modalItems}
                    </ScrollView>
                  </View>
                  <View style={[Styles.buttonView, customStyle.buttonView || {}]}>
                    <TouchableHighlight
                      underlayColor="transparent"
                      activeOpacity={0.8}
                      onPress={this.cancelSelect}>
                      <View style={[Styles.modalButton, customStyle.cancelButton || {}]}>
                        <Text style={[Styles.buttonText, customStyle.cancelText || {}]}>{cancelText}</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="transparent"
                      activeOpacity={0.8}
                      onPress={this.confirmSelect}>
                      <View style={[Styles.modalButton, Styles.confirmButton, customStyle.confirmButton || {}]}>
                        <Text style={[Styles.buttonText, customStyle.confirmText || {}]}>{confirmText}</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

class Label extends Component {
  closeIcon = {
    uri: IMG.closeIcon
  }
  static propTypes = {
    onCancel: PropTypes.func,
    readOnly: PropTypes.bool,
    enable: PropTypes.bool
  }
  static defaultProps = {
    onCancel: () => {},
    enable: true,
    readOnly: false,
    customStyle: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {enable, readOnly, onCancel, customStyle} = this.props;
    return (
      <View style={[Styles.selectedItem, !enable && Styles.disableColor]}>
        <Text style={[Styles.labelText, !enable && Styles.disableText, customStyle.text || {}]}
          numberOfLines={1} ellipsisMode="tail">{this.props.children}</Text>
        {enable && !readOnly && <TouchableHighlight
          style={Styles.closeContainer}
          underlayColor="transparent"
          activeOpacity={0.5}
          onPress={onCancel}>
          <View>
            <Image
              style={Styles.closeIcon}
              source={this.closeIcon}
              resizeMode="cover"/>
          </View>
        </TouchableHighlight>}
      </View>
    );
  }
}

class ModalItem extends Component {
  static propTypes = {
    toggleSelect: PropTypes.func
  }
  static defaultProps = {
    customStyle: {}
  }
  constructor (props) {
    super(props);
    this.isSelected = false;
    this._toggleSelect = this._toggleSelect.bind(this);
  }
  _toggleSelect() {
    const {toggleSelect, data} = this.props;
    this.isSelected = !this.isSelected;
    this.forceUpdate();
    toggleSelect(data);
  }
  render () {
    const {
      customStyle
    } = this.props;
    return (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="transparent"
        onPress={this._toggleSelect}>
        <View style={Styles.modalItem}>
          <Text style={Styles.modalText} numberOfLines={1} ellipsisMode="tail">{this.props.children}</Text>
          <View style={[Styles.outerCircle, this.isSelected ? Styles.enableCircle : {}, customStyle.outerCircle || {}]}>
            {this.isSelected && <View style={[Styles.innerCircle, customStyle.innerCircle || {}]}/>}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

LabelSelect.Label = Label;
LabelSelect.ModalItem = ModalItem;

export default LabelSelect;
