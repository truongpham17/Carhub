import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ViewContainer,
  InputForm,
  ListItem,
  Button,
  ImageSelector,
} from 'Components';
import { NavigationType, UserType } from 'types';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import { scanVinCodeByCamera } from '@redux/actions/lease';

type PropTypes = {
  navigation: NavigationType,
  vin: String,
  loading: Boolean,
  scanVinCodeByCamera: () => void,
};

const HostScanCameraScreen = ({
  navigation,
  scanVinCodeByCamera,
  vin,
  loading,
}: PropTypes) => {
  const [camera, setCamera] = useState('');

  const onPressBack = () => {
    navigation.pop();
  };

  const takePicture = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      scanVinCodeByCamera(
        { vin: visionResp[0].text },
        {
          onSuccess: () => navigation.navigate('HostScreen'),
          onFailure: () => {
            console.log('error');
          },
        }
      );
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Scan VIN"
      onBackPress={onPressBack}
      loading={loading}
      style={styles.container}
    >
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
    </ViewContainer>
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

export default connect(
  state => ({
    loading: state.lease.loading,
    user: state.user,
    vin: state.lease.vin,
  }),
  { scanVinCodeByCamera }
)(HostScanCameraScreen);
