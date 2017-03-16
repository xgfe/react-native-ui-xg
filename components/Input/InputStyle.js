import StyleSheet from 'react-native-stylesheet-xg';

const Style = StyleSheet.create({
  inputCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5'
  },
  multiInputCon: {
    height: null,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  focus: {
    borderColor: '#ff9900'
  },
  error: {
    borderColor: '#ec5330'
  },
  disabled: {
    backgroundColor: '#e5e5e5'
  },
  input: {
    flexGrow: 1,
    height: 44,
    padding: 0,
    color: '#333',
    fontSize: 14
  },
  columnModeInput: {
    marginTop: -10,
    marginBottom: -5,
    alignSelf: 'stretch'
  },
  multiInput: {
    marginBottom: -20,
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    android: {
      paddingTop: 8
    },
    ios: {
      marginTop: -3,
      marginBottom: -28
    }
  },
  labelCon: {
    flexDirection: 'row',
    width: 90,
    height: 44,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  columnModeLabelCon: {
    width: null,
    height: 35,
    alignSelf: 'stretch'
  },
  label: {
    fontSize: 14,
    color: '#666'
  },
  lineBottom: {
    position: 'absolute',
    height: 2,
    bottom: -1,
    left: 0,
    right: 0,
    backgroundColor: '#ff9900'
  },
  lineError: {
    backgroundColor: '#ec5330'
  },
  tips: {
    marginTop: 1,
    marginLeft: 5,
    fontSize: 12,
    color: '#06c1ae'
  },
  required: {
    fontSize: 14,
    color: '#ec5330'
  }
});

export default Style;
