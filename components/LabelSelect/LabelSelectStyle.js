/**
 * Created by TinySymphony on 2017-01-03.
 */

import {Dimensions, StyleSheet} from 'react-native';
const window = Dimensions.get('window');
const {width, height, scale} = window;

export const Color = {
  disableColor: '#eaeaea',
  main: '#40cca2'
};

export const IMG = {
  closeIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==',
  addIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2X0QnCQAyG87cLuIF1EusEOoq+NPTJ+lSuLzqKTmDdRDdwgbvISRVEhGuVFiGBe8td/nyB+wlo4MDA9amzgLIskyiKjr4B59wsz/Nzl2Y6CzDGLAFsfVERWTHzrm8BBYB1I2DDzIUKUAJKQAn8NwH/t8dxPAcwCulERFIi8sdHDaAOvHe11h4e3vH0gqqqvJmMQx75NkdEzsw88e8MIoCILlmWJS8CGntdEFHQCAB4/NOGxklEgkZARFfn3P5tBG2xGmPUDZWAElACSmDYxaSx7/v/b61Ne1/N2nrHp/zOu+GvBNwAa6vsIVXzFTsAAAAASUVORK5CYII='
};

export default StyleSheet.create({
  selectedView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  selectedItem: {
    margin: 4,
    borderWidth: 2 / scale,
    borderRadius: 6,
    borderColor: '#aaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#f6f6f6'
  },
  addItem: {
    padding: 7
  },
  disableColor: {
    backgroundColor: Color.disableColor
  },
  labelText: {
    padding: 6,
    fontSize: 14,
    lineHeight: 14,
    maxWidth: 300
  },
  closeContainer: {
    padding: 8,
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#c8c8c8'
  },
  closeIcon: {
    width: 10,
    height: 10
  },
  addIcon: {
    width: 12,
    height: 12
  },
  modalMask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000077'
  },
  modalContainer: {},
  modal: {
    height: height * 0.6,
    width: width * 0.6,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20
  },
  scrollView: {
    height: height * 0.6 - 80
  },
  buttonView: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    height: 40,
    width: width * 0.3,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.main
  },
  modalItem: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2 / scale,
    borderBottomColor: '#bbb'
  },
  modalText: {
    fontSize: 16,
    width: width * 0.6 - 70
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  confirmButton: {
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#fff'
  },
  outerCircle: {
    borderWidth: 2 / scale,
    borderColor: '#888',
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enableCircle: {
    borderColor: Color.main
  },
  innerCircle: {
    backgroundColor: Color.main,
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  disableText: {
    color: '#999'
  }
});
