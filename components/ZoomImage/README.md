## react-native-zoom-image

ZoomImage component for React Native Application (ios / android)

> **Only works with https network images** [With the limitation of the current react-native, we can't get original size of required images. This component just zooms them with given size (provided by `imgStyle` prop)]

> If you need to support http network images, modify info.plist please :)

### Examples

See at [this page](https://github.com/Tinysymphony/react-native-zoom-image#readme)

### Usage

**install from npm**

``` shell
npm install --save react-native-zoom-image

```

**import in project**

``` js
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native'; // import Easing if you want to customize easing function
```

```js
let styles = {
  img: {} // custom styles of original image component
};
// in render function
<ZoomImage
  source={{uri: 'https://ooo.0o0.ooo/2017/03/31/58de0e9b287f6.jpg'}}
  imgStyle={{width: 250, height: 230}}
  style={styles.img}
  duration={200}
  enableScaling={false}
  easingFunc={Easing.ease}
/>

```

## Properties

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | bool | false | Whether to disable the component or not. |
| startCapture | bool | false | Whether to capture start touch event or not. |
| moveCapture | bool | false | Whether to capture move event or not. |
| responderNegotiate | function | - | Use custom conditions to enable or disable gesture over image modal. |
| easingFunc | function | Easing.linear | The easing function of animation. |
| showDuration | number | 100 | The duration of showing the image modal. |
| closeDuration | number | 140 | The duration of closing the image modal. |
| rebounceDuration | number | 800 | The total duration of resetting the position of image. The actual duration changes by the displacement of the image in Y-axis. If the displacement equals to the height of screen, the duration shall be 800ms. |
| enableScaling | bool | false | Whether to scale the image when it is polled. |

### Instance methods

| Method | Params | Description |
| --- | --- | --- |
| openModal | - | Open image modal |
| closeModal | - | Close image modal. |

LICENSE MIT
