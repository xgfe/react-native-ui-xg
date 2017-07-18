/**
 * Created by TinySymphony on 2017-01-03.
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LabelSelect from '../index';

export default class checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [{
        name: 'Aspirin',
        isSelected: false,
        value: 1
      }, {
        name: 'MarginTop',
        isSelected: true,
        value: 2
      }, {
        name: 'Dooper',
        isSelected: true,
        value: 3
      }, {
        name: 'Young Skywalker',
        isSelected: false,
        value: 4
      }, {
        name: 'Jedi Master',
        isSelected: true,
        value: 5
      }, {
        name: 'Anakin',
        isSelected: false,
        value: 6
      }, {
        name: 'ナウシカ',
        isSelected: false,
        value: 7
      }, {
        name: '你好',
        isSelected: false,
        value: 8
      }]
    };
    this.selectConfirm = this.selectConfirm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  selectConfirm(list) {
    let {arr} = this.state;
    for (let item of list) {
      let index = arr.findIndex(ele => ele === item);
      if (~index) {arr[index].isSelected = true;}
      else {continue;}
    }
    this.setState({arr: arr});
  }
  deleteItem(item) {
    let {arr} = this.state;
    let index = arr.findIndex(a => a === item);
    arr[index].isSelected = false;
    this.setState({arr: arr});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Normal LabelSelect</Text>
        <LabelSelect
          title="Checkbox"
          ref="select"
          style={styles.labelSelect}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <LabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</LabelSelect.Label>
          )}
          {this.state.arr.filter(item => !item.isSelected).map((item, index) =>
            <LabelSelect.ModalItem
              key={'modal-item-' + index}
              data={item}
            >{item.name}</LabelSelect.ModalItem>
          )}
        </LabelSelect>
        <Text style={styles.text}>ReadOnly LabelSelect</Text>
        <LabelSelect
          style={styles.labelSelect}
          title="Checkbox"
          readOnly={true}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <LabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</LabelSelect.Label>
          )}
        </LabelSelect>
        <Text style={styles.text}>Disabled LabelSelect</Text>
        <LabelSelect
          style={styles.labelSelect}
          title="Checkbox"
          enable={false}
          onConfirm={this.selectConfirm}
        >
          {this.state.arr.filter(item => item.isSelected).map((item, index) =>
            <LabelSelect.Label
              key={'label-' + index}
              data={item}
              onCancel={() => {this.deleteItem(item);}}
            >{item.name}</LabelSelect.Label>
          )}
        </LabelSelect>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dashed',
    borderColor: '#6dc2a2'
  },
  text: {
    fontSize: 16,
    color: 'rgb(13, 131, 144)'
  }
});
