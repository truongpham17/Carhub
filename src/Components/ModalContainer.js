import React from 'react';
import { View, Modal } from 'react-native';
import { pure } from 'recompose';

type PropTypes = {
  children: NodeList,
  onClose: () => void,
  modalVisible: boolean,
  position?: 'center' | 'flex-end',
  animationType?: 'fade' | 'slide',
  grantResponder?: boolean,
};

const ModalContainer = ({
  children,
  onClose,
  modalVisible,
  position = 'center',
  animationType = 'fade',
  grantResponder = true,
}: PropTypes) => {
  const onModalPress = evt => {
    const { nativeEvent } = evt;
    const { pageX, pageY, locationY, locationX } = nativeEvent;
    if (pageX === locationX && pageY === locationY) {
      onClose();
    }
  };
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={onClose}
      onDismiss={onClose}
      transparent
      animationType={animationType}
    >
      <View
        style={{
          flex: 1,
          justifyContent: position,
          backgroundColor: 'rgba(0,0,0,0.4)',
          alignItems: 'center',
        }}
        onStartShouldSetResponder={() => grantResponder}
        onResponderGrant={onModalPress}
      >
        {children}
      </View>
    </Modal>
  );
};

export default pure(ModalContainer);
