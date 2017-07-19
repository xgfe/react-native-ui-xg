/**
 * Created by lulutia on 2017-04-13.
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Accordion from '../Accordion';

const items = [
  {
    name: 'HOME',
    description: "Gone with the Wind is a 1939 American epic historical romance film adapted from Margaret Mitchell's 1936 novel Gone with the Wind. It was produced by David O. Selznick of Selznick International Pictures and directed by Victor Fleming."
  },
  {
    name: 'PRODUCT',
    description: "The Godfather is a 1972 American crime film directed by Francis Ford Coppola and produced by Albert S. Ruddy, based on Mario Puzo's best-selling novel of the same name."
  },
  {
    name: 'SETTINGS',
    description: 'just for test'
  }
];

export default class AccordionExample extends Component {

  renderHeader(info) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{info}</Text>
      </View>
    );
  }

  renderContent(info) {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{info}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.example}>
        <Accordion
          style={styles.accordion}
          items = {items}
          headerRender = {this.renderHeader}
          contentRender = {this.renderContent}
          headerName = "name"
          contentName = "description"
          maxHeight = {90}
          duration = {200}
          backgroundColor = {'#fff'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  example: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#f1f1f1'
  },
  accordion: {
    borderTopWidth: 1,
    borderTopColor: '#666'
  },
  content: {
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    padding: 10,
    backgroundColor: '#fff'
  },
  headerText: {
  },
  contentText: {
  }
});
