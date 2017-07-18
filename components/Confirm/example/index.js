import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Confirm from '../Confirm';
import Button from 'react-native-buttons';

export default class confirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test1: '',
      test2: '12',
      test3: '',
      test4: '',
      test5: '',
      test6: '',
      test7: ''
    };
  }
  _onPressButton(number) {
    switch (number) {
      case 1:
        this.refs.confirm.open({
          content:
          (<View>
            <Text>地址将修改为:<Text style={{color: 'red'}}>测试地址</Text></Text>
            <Text style={{marginTop: 10}}>该地址会影响之后的操作，请谨慎修改</Text>
          </View>),
          confirm: () => {
            return;
          }
        });
        break;
      case 2:
        this.refs.confirm1.open({
          title: 'user-defined',
          comment: 'just a test',
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          confirm: () => {
            return;
          }
        });
        break;
      case 3:
        this.refs.confirm2.open({
          title: 'cancel disable',
          comment: 'just a test',
          commentRequired: true,
          disableCancel: true,
          cancelText: 'Cancel',
          confirm: () => {
            return;
          }
        });
        break;
      default: return;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          theme="blue"
          size="default"
          onPress={() => {this._onPressButton(1);}}>打开confirm1</Button>
        <Button
          selfStyle={{marginTop: 20}}
          theme="orange"
          size="default"
          onPress={() => {this._onPressButton(2);}}>打开confirm2</Button>
        <Button
          selfStyle={{marginTop: 20}}
          theme="red"
          size="default"
          onPress={() => {this._onPressButton(3);}}>打开confirm3</Button>
        <Confirm ref="confirm"/>
        <Confirm ref="confirm1"/>
        <Confirm ref="confirm2"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerBtn: {
    height: 40,
    borderRadius: 0,
    alignSelf: 'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
