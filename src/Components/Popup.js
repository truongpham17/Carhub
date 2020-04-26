import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import ModalContainer from './ModalContainer';
import ConfirmPopup from './ConfirmPopup';
import StatusDialog from './StatusDialog';
import PolicyPopup from './PolicyPopup';
import ProfilePopup from './ProfilePopup';
import PromptDialog from './PromptDialog';

type PropTypes = {
  popupType: String,
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  grandResponder: Boolean,
};

const PopUp = (props: PropTypes) => {
  const { popupType, modalVisible, onClose, grandResponder } = props;
  const renderContent = () => {
    switch (popupType) {
      case 'confirm':
        return <ConfirmPopup {...props} />;
      case 'success':
      case 'error':
        return <StatusDialog {...props} />;
      case 'policy':
        return <PolicyPopup {...props} />;
      case 'profile':
        return <ProfilePopup {...props} />;
      case 'prompt':
        return <PromptDialog {...props} />;

      default:
        return null;
    }
  };
  return (
    <ModalContainer
      modalVisible={modalVisible}
      onClose={onClose}
      grantResponder={grandResponder}
    >
      <View
        style={[
          styles.containerStyle,
          popupType === 'policy' ? { width: '90%' } : {},
        ]}
      >
        {renderContent()}
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
    padding: scaleHor(16),
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PopUp;
