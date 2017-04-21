/**
 * Created by lulutia on 2017-04-13.
 */

import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';

import Collapse from './Collapse';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: undefined
    };
  }

  _toggle(index) {
    let oldItem = this.state.activeItem;
    if (oldItem === index) {
      this.setState({activeItem: undefined});
    } else {
      this.setState({activeItem: index});
    }
  }
  render() {
    const {
      items,
      headerRender,
      contentRender,
      headerName,
      contentName,
      maxHeight,
      duration,
      backgroundColor
    } = this.props;
    return (
      <View style={styles.container}>
        {items.map((item, index) => {
          return (
            <View key={index}>
              <TouchableHighlight
              underlayColor={'rgba(0,0,0,0.2)'}
              style={[styles.header, index === (items.length - 1) && styles.headerBorder]}
              onPress={() => {this._toggle(index);}}>
                {headerRender(item[headerName])}
              </TouchableHighlight>
              <Collapse
                maxHeight = {maxHeight}
                collapse = {this.state.activeItem !== index}
                content = {contentRender(item[contentName])}
                duration = {duration}
                backgroundColor = {backgroundColor}
              />
            </View>
          );
        })}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  headerBorder: {
    borderBottomWidth: 1
  },
  collapseContainer: {
    paddingTop: 0
  },
  collapseItem: {
    paddingBottom: 0
  }
});

Accordion.defaultProps = {
  items: [],
  duration: 500
};
