import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';

import Grading from '../index.js';
import GradingModal from '../GradingModal.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders grading modal correctly', () => {
  expect(renderer.create(
    <GradingModal
      cancelButtonStyle={{backgroundColor: '#999'}}
      confirmButtonStyle={{backgroundColor: '#db4812'}}
      score={40}
      isPercentage={true}/>
  )).toMatchSnapshot();
});

it('renders board correctly', () => {
  const tree = shallow(
    <Grading score={4.0} num={72346} fontColor="#552da6" activeColor="#2bb8aa"/>
  );
  let instance = tree.instance();
  expect(instance.props.score).toEqual(4);
  expect(instance.props.scoreBase).toEqual(5);
  expect(instance.props.num).toEqual(72346);
  expect(instance.props.fontColor).toEqual('#552da6');
  expect(instance.props.activeColor).toEqual('#2bb8aa');
  expect(instance.props.defaultColor).toEqual('#eee');
  expect(instance.props.cancelText).toEqual('Cancel');
  expect(instance.props.confirmText).toEqual('Confirm');
});

it('renders stars correctly', () => {
  const tree = shallow(
    <Grading mode="stars" score={4.0} activeColor="#a52ca6"/>
  );
  let instance = tree.instance();
  expect(instance.props.score).toEqual(4);
  expect(instance.props.activeColor).toEqual('#a52ca6');
});

it('renders arcs correctly', () => {
  const tree = shallow(
    <Grading mode="arcs" score={6.0} scoreBase={8} defaultColor="#999"/>
  );
  let instance = tree.instance();
  expect(instance.props.score).toEqual(6);
  expect(instance.props.scoreBase).toEqual(8);
  expect(instance.props.defaultColor).toEqual('#999');
});

it('renders smiles correctly', () => {
  const tree = shallow(
    <Grading mode="smiles" isLike={true} activeColor="#556"/>
  );
  let instance = tree.instance();
  expect(instance.props.isLike).toEqual(true);
  expect(instance.props.activeColor).toEqual('#556');
});

it('interact with modal', () => {
  let resultScore;
  let initScore = 38;
  const tree = shallow(
    <GradingModal
      confirmButton={{backgroundColor: '#db4812'}}
      isPercentage={true}
      score={initScore}
      onGrading={(score) => {resultScore = score;}}/>
  );
  let instance = tree.instance();
  instance.onPressCancel();
  expect(instance.isModalVisible).toEqual(false);
  instance.openModal();
  instance.onScrollChange(240, 1000);
  expect(instance.isModalVisible).toEqual(true);
  instance.onPressConfirm();
  expect(instance.isModalVisible).toEqual(false);
  expect(resultScore).toEqual(initScore);
});
