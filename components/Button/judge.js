import {Platform} from 'react-native';

export function judgePlatformLevel(module) {
  const level = Platform.Version;
  if (module === 'TouchableNativeFeedback') {
    return level >= 21;
  }
}
