import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RNCamera } from 'react-native-camera';

import BarcodeMask from 'react-native-barcode-mask';

import { connect, useDispatch } from 'react-redux';

import { NavigationType } from 'types';
import { ViewContainer, alert } from 'Components';
import { scaleHor } from 'Constants/dimensions';
import { RotationGestureHandler } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

type PropTypes = {
  navigation: NavigationType,
};

const ScanScreen = ({ navigation }: PropTypes) => {
  const [barcode, setBarcode] = useState(null);
  const onBackPress = () => {
    navigation.pop();
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      const data = JSON.parse(`${barcodes.data}`);
      if (!data.id) {
        alert({ title: 'Cannot recogize contract' });
        return;
      }

      navigation.pop();
      setTimeout(() => {
        alert({
          title: 'Confirm car',
          detail: 'Are you sure to confirm transfer car',
          onConfirm() {
            firebase
              .database()
              .ref(`/sharing/${data.id}`)
              .set({ status: 'CONFIRM_BY_HOST' });
          },
          onClose() {
            firebase
              .database()
              .ref(`/sharing/${data.id}`)
              .set({ status: 'cancel' });
          },
        });
      }, 300);

      //  data._id => sharingRequestId
    }
  };

  return (
    <ViewContainer
      title="Scanning car"
      haveBackHeader
      onBackPress={onBackPress}
      style={{ paddingHorizontal: 0 }}
    >
      <RNCamera
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={barcodeRecognize}
      >
        <BarcodeMask />
      </RNCamera>
    </ViewContainer>
  );
};

export default ScanScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '100%',
  },
});
