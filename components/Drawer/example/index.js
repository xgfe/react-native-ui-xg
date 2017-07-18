import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  TouchableHighlight
} from 'react-native';

import Drawer from '../index';

const {width, height} = Dimensions.get('window');

export default class DrawerExample extends Component {
  render() {
    var drawerContent = (<View style={styles.drawerContent}>
      <View style={styles.leftBottom}>
        <View style={styles.returnView}>
          <Text>Drag / click the left side to close drawer.</Text>
          <Text>Or click the button bellow.</Text>
          <TouchableHighlight
            style={[styles.btn, styles.closeBtn]}
            underlayColor="#0d9ebe"
            onPress={() => {this.drawer && this.drawer.closeDrawer();}}>
            <Text style={styles.btnText}>Close Drawer</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>);
    return (
      <Drawer
        ref={(drawer) => {this.drawer = drawer;}}
        style={styles.container}
        drawerWidth={width}
        drawerContent={drawerContent}
        type={Drawer.types.Default}
        customStyles={{drawer: styles.drawer}}
        drawerPosition={Drawer.positions.Right}
        easingFunc={Easing.ease}
      >
        <View style={styles.content}>
          <Text style={styles.name}>React Native Drawer Menu</Text>
          <Text>Drag the right side to open drawer.</Text>
          <Text>Or click the button bellow.</Text>
          <TouchableHighlight
            style={styles.btn}
            underlayColor="#c33d19"
            onPress={() => {this.drawer && this.drawer.openDrawer();}}>
            <Text style={styles.btnText}>Open Drawer</Text>
          </TouchableHighlight>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  returnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#f06355'
  },
  closeBtn: {
    backgroundColor: '#13c9e9'
  },
  btnText: {
    fontSize: 14,
    color: '#f0f0f0'
  },
  name: {
    fontSize: 20,
    marginBottom: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    position: 'absolute',
    backgroundColor: '#2ba'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftBottom: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#f0f0f0'
  },
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10
  }
});
