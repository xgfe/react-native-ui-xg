/**
 * Created by TinySymphony on 2016-12-26.
 * Styles of Grading Component
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  board: {
    alignItems: 'center',
    padding: 4,
    width: 70,
    height: 80,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  boardGradingWp: {
    alignItems: 'center',
    width: 62,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  boardGrading: {
    fontSize: 24,
    color: '#fa952f'
  },
  boardNum: {
    color: '#999'
  },
  boardStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  arcs: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-start'
  },
  arcContainer: {
    alignItems: 'center'
  },
  arc: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  arcGrading: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  smiles: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
