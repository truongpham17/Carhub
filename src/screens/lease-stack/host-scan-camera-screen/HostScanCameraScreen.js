import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType, UserType } from 'types';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import { scanVinCodeByCamera, setLeaseInfo } from '@redux/actions/lease';

type PropTypes = {
  navigation: NavigationType,
  vin: String,
};

const HostScanCameraScreen = ({ navigation }: PropTypes) => {
  const [camera, setCamera] = useState('');
  const loading = useSelector(state => state.lease.loading);
  const { type = 'vin' } = navigation.state.params;
  const dispatch = useDispatch();

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
      setLeaseInfo(dispatch)({ loading: true });

      const { uri } = await camera.takePictureAsync(options);

      const visionResp = await RNTextDetector.detectFromUri(uri);
      setLeaseInfo(dispatch)({
        [type]: visionResp[0].text,
        loading: false,
      });
      navigation.pop();
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Scan VIN"
      loading={loading}
      onBackPress={onPressBack}
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
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{ fontSize: 14 }}>SNAP</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    alignItems: 'center',
  },
});

export default connect(state => ({
  user: state.user,
  vin: state.lease.vin,
}))(HostScanCameraScreen);
