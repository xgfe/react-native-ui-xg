## react-native-zoom-image

ZoomImage component for React Native Application (ios / android)


### Examples


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

### Instance methods

LICENSE MIT
