import { PermissionsAndroid } from 'react-native';

export async function requestPermission(permission, title = '', message = '') {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title,
      message,
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (error) {}
}
