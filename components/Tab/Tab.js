import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import Style from './TabStyle';


class Tab extends Component {

  // 构造
  constructor(props) {
    super(props);
    this.renderMenuItems = this.renderMenuItems.bind(this);
  }


  renderMenuItems() {
    const {
      active,
      itemList
    } = this.props;
    return itemList && itemList.map((item) => {
      const color = active === item.key ? '#ff9900' : '#999';

      return (
        <TouchableWithoutFeedback key={item.key}
          onPress={() => active !== item.key && item.onPress()}
        >
          <View style={Style.menuItem}>
            {item.icon}
            <Text style={[Style.menuTitle, {
              color
            }]}
            >{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {

    return (
      <View style={Style.menu}>
        {this.renderMenuItems()}
      </View>
    );
  }
}

export default Tab;
