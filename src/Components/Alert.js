import React, { useState } from 'react';
import { Alert } from 'react-native';
import { defaultFunction } from 'Utils/common';
import ConfirmPopup from './ConfirmPopup';

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

export function showConfirm({
  title,
  description,
  onDecline = defaultFunction,
  onConfirm = defaultFunction,
  onClose = defaultFunction,
}) {
  const [visible, setVisible] = useState(true);
  return (
    <ConfirmPopup
      title={title}
      description={description}
      modalVisible={visible}
      onDecline={onDecline}
      onConfirm={onConfirm}
      onClose={() => setVisible(false)}
    />
  );
}
