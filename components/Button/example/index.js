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
      <View style={{marginLeft: 20, marginTop: 20}}>
        <Button
          type="surface"
          size="small"
          theme="orange"
          loadingTitle="正在加载"
          isLoading={true}
          onPress={this._onPressButton}>Small</Button>
        <Button
          selfStyle={{marginLeft: 120}}
          type="ghost"
          size="small"
          theme="blue"
          isLoading={true}
          onPress={this._onPressButton}>Default</Button>
        <Button
          selfStyle={{marginTop: 60}}
          theme="#BA55D3"
          loadingTitle="正在加载"
          isLoading={true}
          disableColor="#00C5CD"
          onPress={this._onPressButton}>Default</Button>
        <Button
          selfStyle={{marginLeft: 120, marginTop: 60}}
          theme="#BA55D3"
          loadingTitle="正在加载"
          isLoading={true}
          disableColor="#00C5CD"
          loadingColor="rgba(221,106,167,0.8)"
          onPress={this._onPressButton}>Default</Button>
        <Button
          selfStyle={{marginLeft: 240, marginTop: 60}}
          theme="#BA55D3"
          isLoading={true}
          onPress={this._onPressButton}>Default</Button>
        <Button
          selfStyle={{marginTop: 120}}
          theme="rgba(221,106,167,0.8)"
          onPress={this._onPressButton}>default-btn</Button>
        <Button
          selfStyle={{marginTop: 120, marginLeft: 110}}
          theme="rgba(221,106,167,0.8)"
          onPress={this._onPressButton}><Text style={{marginRight: 20}}>node</Text>string</Button>
        <Button
          selfStyle={{marginTop: 120, marginLeft: 240}}
          theme="rgba(221,106,167,0.8)"
          isLoading={true}
          onPress={this._onPressButton}><Text style={{marginRight: 20}}>test</Text>test</Button>
        <Button
          selfStyle={{marginTop: 180}}
          theme="#00C5CD"
          size="small"
          onPress={this._onPressButton}>small</Button>
        <Button
          selfStyle={{marginTop: 230}}
          theme="#00C5CD"
          size="default"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 280}}
          theme="#00C5CD"
          size="large"
          onPress={this._onPressButton}>large</Button>
        <Button
          selfStyle={{marginTop: 350}}
          theme="blue"
          size="default"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 350, marginLeft: 80}}
          theme="red"
          size="default"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 350, marginLeft: 160}}
          theme="orange"
          size="default"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 350, marginLeft: 240}}
          theme="gray"
          size="default"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 400}}
          theme="blue"
          size="default"
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 400, marginLeft: 80}}
          theme="red"
          size="default"
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 400, marginLeft: 160}}
          theme="orange"
          size="default"
          type="ghost"
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 400, marginLeft: 240}}
          theme="gray"
          size="default"
          type="ghost"
          disabled={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 450}}
          theme="blue"
          size="default"
          active={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 450, marginLeft: 80}}
          theme="red"
          size="default"
          active={true}
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 450, marginLeft: 160}}
          theme="orange"
          size="default"
          active={true}
          type="ghost"
          onPress={this._onPressButton}>default</Button>
        <Button
          selfStyle={{marginTop: 450, marginLeft: 240}}
          theme="gray"
          size="default"
          active={true}
          type="ghost"
          onPress={this._onPressButton}>default</Button>
      </View>
    );
  }
}

export default button;
