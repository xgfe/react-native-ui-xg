import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  navigationBar: {
    backgroundColor: '#f7f7f8',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  back: {
    width: 43,
    height: 43,
    marginLeft: 10,
    justifyContent: 'center'
  },
  backText: {
    fontSize: 16,
    color: '#333'
  },
  navTitle: {
    height: 43,
    justifyContent: 'center'
  },
  navTitleText: {
    fontSize: 18,
    color: '#333'
  },
  sceneStyle: {
    flex: 1,
    marginTop: 44
  },
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#333'
  },
  listView: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  listItem: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  right: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});

export default styles;
