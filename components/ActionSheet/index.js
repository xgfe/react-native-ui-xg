/**
 * Created by lulutia on 2017-03-31.
 */

import {
  Platform
} from 'react-native';

import ActionSheetAndroid from './actionSheetAndroid';
import ActionSheetNewIOS from './actionSheetIOS';

let ActionSheet = Platform.OS === 'android' ? ActionSheetAndroid : ActionSheetNewIOS;

export default ActionSheet;

