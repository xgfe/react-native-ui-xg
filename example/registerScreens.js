// !important: Don't modify this file manually.

// #anchor#
import CalendarSelect from '../components/CalendarSelect/example';
import Accordion from '../components/Accordion/example';
import ZoomImage from '../components/ZoomImage/example';
import ActionSheet from '../components/ActionSheet/example';
import DatePicker from '../components/DatePicker/example';
import Drawer from '../components/Drawer/example';
import LabelSelect from '../components/LabelSelect/example';
import Grading from '../components/Grading/example';
import Button from '../components/Button/example';
import Input from '../components/Input/example';
import Confirm from '../components/Confirm/example';
import Link from '../components/Link/example';
import Tab from '../components/Tab/example';
import Home from './Home';

const scenes = {
  // #list#
  CalendarSelect,
  Accordion,
  ZoomImage,
  ActionSheet,
  DatePicker,
  Drawer,
  Grading,
  LabelSelect,
  Button,
  Input,
  Confirm,
  Link,
  Tab,
  Home
};

import {Navigation} from 'react-native-navigation';

export {scenes};

// register all screens of the app (including internal ones)
export default function registerScreens() {
  for(let key in scenes) {
    Navigation.registerComponent(key, () => scenes[key]);
  }
}

