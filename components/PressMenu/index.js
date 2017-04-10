/**
 * Created by TinySymphony on 2017-04-10.
 */

import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class PressMenu extends Component {
  static defaultProps = {
  }
  static propTypes = {
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return <View style={styles.container}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
