import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationType, UserType } from 'types';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';

type PropTypes = {
  navigation: NavigationType,
};

const HostScanCameraScreen = ({ navigation }: PropTypes) => {
  const [camera, setCamera] = useState('');

  const takePicture = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      navigation.navigate('HostScreen');
      navigation.navigate('HostScreen', {
        codeScanned: visionResp[0].text,
      });
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          setCamera(ref);
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        <View
          style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}
        >
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

export default HostScanCameraScreen;
