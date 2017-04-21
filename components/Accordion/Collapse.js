import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView
} from 'react-native';


export default class Collapse extends Component {
  static defaultProps = {
    height: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(this.props.height)
    };
    this.getContentHeight = this.getContentHeight.bind(this);
    this.handleHeight = this.handleHeight.bind(this);

    this.contentInit = false;
    this.contentHeight = 0;
  }

  getContentHeight(event) {
    if (!this.contentInit) {
      this.props.maxHeight ? this.contentHeight = Math.min(this.props.maxHeight, event.nativeEvent.layout.height) : this.contentHeight = event.nativeEvent.layout.height;
      this.contentInit = true;
      this.forceUpdate();
    }
  }

  handleHeight() {
    if (this.props.collapse) {
      Animated.timing(
        this.state.height,
        {toValue: 0,
          duration: this.props.duration}
      ).start();
    } else {
      Animated.timing(
        this.state.height,
        {toValue: this.contentHeight,
          duration: this.props.duration}
      ).start();
    }
  }
  render() {
    if (this.contentInit) {
      this.handleHeight();
    }
    return (
      <Animated.View style={[styles.collapseContainer, this.props.collapse && styles.collapseItem, this.contentInit && {height: this.state.height}, this.props.backgroundColor && {backgroundColor: this.props.backgroundColor}]}>
        <ScrollView onLayout={(event)=>{this.getContentHeight(event);}}>
          {this.props.content}
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  collapseContainer: {
    paddingTop: 0
  },
  collapseItem: {
    paddingBottom: 0
  }
});
