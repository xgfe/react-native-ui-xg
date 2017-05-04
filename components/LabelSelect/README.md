## react-native-label-select [![Build Status](https://travis-ci.org/xgfe/react-native-label-select.svg?branch=master)](https://travis-ci.org/xgfe/react-native-label-select) [![Coverage Status](https://coveralls.io/repos/github/Tinysymphony/react-native-label-select/badge.svg?branch=master)](https://coveralls.io/github/Tinysymphony/react-native-label-select?branch=master)
LabelSelect is a component used for making multiple choices. The modal is a checkbox like html.

## Example
<a href="#android" id="android"><img src="http://7xjgb0.com1.z0.glb.clouddn.com/android.gif" align="left" width="240"/></a>

<a href="#ios" id="ios"><img src="http://7xjgb0.com1.z0.glb.clouddn.com/ios.gif" width="240"/></a>

## Usage

```shell
npm install --save react-native-label-select
```

```js
import LabelSelect from 'react-native-label-select';
```

```html
<LabelSelect
  ref="labelSelect"
  title="Make Choices"
  enable={true}
  readOnly={false}
  enableAddBtn={true}
  style={yourStyle}
  onConfirm={(list) => {...}}>

  <LabelSelect.Label
    key={...}
    data={itemA}
    onCancel={func}>selected ItemA</LabelSelect.Label>
  <LabelSelect.ModalItem
    key={...}
    data={itemB}>Item B</LabelSelect.ModalItem>
</LabelSelect>

```

## Properties

**LabelSelect**

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| style | - | object | Specify styles for the LabelSelect |
| title | - | string | The title text of the modal |
| readOnly | false | bool | is the component readonly |
| enable | true | bool | is the component interactive  |
| enableAddBtn | true | bool | whether to show the add button |
| onConfirm | - | function | Triggered when the confirm button of modal is pressed with the newly selected items list passed as the only argument |
| confirmText | - | string | Text of confirm button. |
| cancelText | - | string | Text of cancelText button. |
| customStyle | - | object | You can customize styles of `modal` / `buttonView` / `confirmButton` / `confirmText` / `cancelButton` / `cancelText` by `customStyle. |

**LabelSelect.Label**


| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| onCancel | - | function | Triggered when the close button of Label is pressed. |
| data | - | any | Data that bind to the Label |
| customStyle | - | object | You can customize styles of `text` by `customStyle. |

**LabelSelect.ModalItem**




| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| data | - | any | Data that bind to the ModalItem. After confirming the items selected on modal, the data will be passed to the selected list. |


## Instance Methods


| Method | Params | Description |
| --- | --- | --- |
| openModal | - | Open select modal |
| cancelSelect | - | Close select modal. Also triggered when the cancel button of modal being pressed. |
| customStyle | - | object | You can customize styles of `modalText` / `outerCircle` / `innerCircle` by `customStyle. |

Use `ref` property as a hook to invoke internal methods.

```html
<LabelSelect ref="select">...</LabelSelect>
```

```js
this.ref.select.openModal()
this.ref.select.cancelSelect()
```
