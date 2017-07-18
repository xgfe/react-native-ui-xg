import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#666'
  },
  listView: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  listItem: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  right: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  itemBody: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#ddd'
  },
  logo: {
    width: 36,
    height: 36,
    marginLeft: 5,
    marginRight: 5,
  }
});

export default styles;
