import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import LabelSelect from '../index';

import mock from './__mock__/mock';

const {Label, ModalItem} = LabelSelect;

let selectedItems = mock.selectedList.map((item, index) =>
  <Label
    key={'label-' + index}
    data={item}
    onCancel={() => {mock.selectedList.splice(index);}}>
    {item.text}
  </Label>
);

let otherItems = mock.list.map((item, index) =>
  <ModalItem
    key={'modal-item-' + index}
    data={item}>
    {item.text}
  </ModalItem>
);

// snapshot test

it('renders enabled LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      title="Test1"
      onConfirm={() => {}}
      >
      {selectedItems}
      {otherItems}
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders readOnly LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      readOnly={true}
      title="Test2"
      onConfirm={() => {}}
      >
      {selectedItems}
      {otherItems}
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders disabled LabelSelect', () => {
  let tree = renderer.create(
    <LabelSelect
      enable={false}
      title="Test3"
      onConfirm={() => {}}
      >
      {selectedItems}
      {otherItems}
    </LabelSelect>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a modal item', () => {
  let item = mock.list[0];
  expect(renderer.create(
    <ModalItem data={item}>{item.text}</ModalItem>
  )).toMatchSnapshot();
});

// enzyme test

it('interact with modal', () => {
  let arr = [];
  const item = mock.list[0];
  const tree = shallow(
    <LabelSelect
      title="Enzyme Test"
      onConfirm={(list) => {arr = list;}}
      enableAddBtn={true}
      >
      {selectedItems}
      {otherItems}
    </LabelSelect>
  );
  let select = tree.instance();
  expect(tree.find('TouchableHighlight').length).toEqual(4);
  select.openModal();
  expect(tree.state('isModalVisible')).toEqual(true);
  select.toggleSelect(item);
  select.confirmSelect();
  expect(arr[0]).toEqual(item);
  expect(tree.state('isModalVisible')).toEqual(false);
  select.openModal();
  select.cancelSelect();
  expect(tree.state('isModalVisible')).toEqual(false);
});

it('selecte a item', () => {
  let data = mock.list[0];
  let result;
  const tree = shallow(
    <ModalItem
      data={data}
      toggleSelect={(item) => {result = item;}}
      >
      {data.text}
    </ModalItem>
  );
  let instance = tree.instance();
  instance._toggleSelect();
  expect(result).toEqual(data);
});
