import StyleSheet from 'react-native-stylesheet-xg';

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  body: {
    width: 300,
    backgroundColor: '#ffffff'
  },
  title: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5'
  },
  content: {
    padding: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  footerBtn: {
    flex: 1,
    height: 40,
    borderRadius: 0,
    alignSelf: 'stretch'
  },
  outerView: {
    color: '#06c1ae',
    fontSize: 15
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: '#666'
  },
  innerView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});

export default Style;
