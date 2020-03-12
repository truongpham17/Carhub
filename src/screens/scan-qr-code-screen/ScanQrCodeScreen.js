import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { ViewContainer } from 'Components';
import { scaleVer } from 'Constants/dimensions';

const ScanQrCodeScreen = () => {
  const [barcode, setBarcode] = useState('');
  const barcodeRecognize = barcodes => {
    setBarcode(barcodes.data);
    console.log(barcode);
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
};

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
    width: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ScanQrCodeScreen;
