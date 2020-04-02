import { Alert } from 'react-native';

export function alert({ title, detail, onConfirm, onClose }) {
  Alert.alert(
    title,
    detail,
    [
      { text: 'Cancel', onPress: onClose, style: 'cancel' },

      {
        text: 'OK',
        onPress: onConfirm,
      },
    ],
    { cancelable: false }
  );
}
