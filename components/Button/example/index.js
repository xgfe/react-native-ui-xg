import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import Button from '../Button';

// data

class button extends Component {
  _onPressButton () {
    console.log('onpress');
  }
  render() {
    return (
      <View style={
        {flex: 1}
      }>
      <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          type="surface"
          size="small"
          theme="orange"
          selfStyle={{marginRight: 10}}
          loadingTitle="正在加载"
          isLoading={true}
          onPress={this._onPressButton}>Small</Button>
        <Button
          type="ghost"
          size="small"
          theme="blue"
          selfStyle={{marginRight: 10}}
          isLoading={true}
          onPress={this._onPressButton}>Default</Button>
      </View>

       <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="#BA55D3"
          loadingTitle="正在加载"
          selfStyle={{marginRight: 10}}
          isLoading={true}
          disableColor="#00C5CD"
          onPress={this._onPressButton}>Default</Button>
        <Button
          theme="#BA55D3"
          loadingTitle="正在加载"
          selfStyle={{marginRight: 10}}
          isLoading={true}
          disableColor="#00C5CD"
          loadingColor="rgba(221,106,167,0.8)"
          onPress={this._onPressButton}>Default</Button>
        <Button
          theme="#BA55D3"
          selfStyle={{marginRight: 10}}
          isLoading={true}
          onPress={this._onPressButton}>Default</Button>
        </View>
         <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="rgba(221,106,167,0.8)"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default-btn</Button>
        <Button
          theme="rgba(221,106,167,0.8)"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}><Text style={{marginRight: 20}}>node</Text>string</Button>
        <Button
          theme="rgba(221,106,167,0.8)"
          isLoading={true}
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}><Text style={{marginRight: 20}}>test</Text>test</Button>
        </View>
            <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="#00C5CD"
          size="small"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>small</Button>
        <Button
          theme="#00C5CD"
          size="default"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="#00C5CD"
          size="large"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>large</Button>
        </View>
         <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="blue"
          size="default"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="red"
          size="default"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="orange"
          size="default"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="gray"
          size="default"
          selfStyle={{marginRight: 10}}
          onPress={this._onPressButton}>default</Button>
        </View>
         <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="blue"
          size="default"
          selfStyle={{marginRight: 10}}
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="red"
          size="default"
          selfStyle={{marginRight: 10}}
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="orange"
          size="default"
          type="ghost"
          selfStyle={{marginRight: 10}}
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="gray"
          size="default"
          type="ghost"
          selfStyle={{marginRight: 10}}
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        </View>
         <View style={
        {flex: 1, flexDirection: 'row', alignItems: 'center'}
      }>
        <Button
          theme="blue"
          size="default"
          selfStyle={{marginRight: 10}}
          active={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="red"
          size="default"
          selfStyle={{marginRight: 10}}
          active={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="orange"
          size="default"
          selfStyle={{marginRight: 10}}
          active={true}
          type="ghost"
          onPress={this._onPressButton}>default</Button>
        <Button
          theme="gray"
          size="default"
          selfStyle={{marginRight: 10}}
          active={true}
          type="ghost"
          onPress={this._onPressButton}>default</Button>
      </View>
      </View>
    );
  }
}

export default button;
