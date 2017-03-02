/**
 * Created by TinySymphony on 2017-01-19.
 * Styles of GradingModal Component
 */

import {StyleSheet, Dimensions} from 'react-native';
const {width, height, scale} = Dimensions.get('window');

export const Size = {
  itemHeight: 40,
  widthFactor: 0.6,
  heightFactor: 0.4
};

export const Color = {
  maskColor: '#00000077'
};

// calculate offset number to place selected item at the center of the screen
Size.offsetNum = Math.floor(height * Size.heightFactor / 2 / Size.itemHeight + 1);

export default StyleSheet.create({
  modalMask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.maskColor
  },
  modalContainer: {
  },
  modal: {
    width: width * Size.widthFactor,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  modalItem: {
    height: Size.itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  selectedItem: {
    backgroundColor: '#e6f6f9'
  },
  modalText: {
    fontSize: 18,
    color: '#999'
  },
  selectedText: {
    fontSize: 22,
    color: '#333'
  },
  modalButtons: {
    borderTopWidth: 2 / scale,
    borderColor: '#c6c6c6',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    height: 40,
    width: width * Size.widthFactor / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18
  },
  cancelButton: {
    backgroundColor: '#c7c7c7'
  },
  confirmButton: {
    backgroundColor: '#49aec8'
  },
  modalScroll: {
    height: height * Size.heightFactor
  },
  buttonView: {
    flexDirection: 'row'
  },
  cancelText: {
    color: '#fff'
  },
  confirmText: {
    color: '#fff'
  }
});
