import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  ListItem,
  Button,
  ImageSelector,
} from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType, UserType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import {
  checkCarByVin,
  getCustomerPreviousCarList,
  setValue,
} from '@redux/actions/lease';
import { selectImage } from 'Utils/images';
import Seperator from './Seperator';

type PropTypes = {
  checkCarByVin: () => void,
  getCustomerPreviousCarList: () => void,
  setValue: () => void,
  navigation: NavigationType,
  loading: Boolean,
  user: UserType,
  vin: String,
  usingYears: String,
  odometers: String,
};

const HostScreen = ({
  checkCarByVin,
  navigation,
  loading,
  user,
  vin,
  usingYears,
  odometers,
  getCustomerPreviousCarList,
  setValue,
}: PropTypes) => {
  console.log({ vin, usingYears, odometers });
  const [images, setImages] = useState(['']);

  const handleChangeVin = vin => {
    setValue({ vin });
  };
  const handleChangeUsingYears = usingYears => {
    setValue({ usingYears });
  };
  const handleChangeOdometers = odometers => {
    setValue({ odometers });
  };
  const handleAddImage = () => {
    selectImage(image => setImages([...images, image]));
  };
  const handleRemoveImage = uri => {
    setImages(images => images.filter(image => image !== uri));
  };
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    checkCarByVin(
      {
        vin,
        usingYears,
        odometers,
        images: images.filter((_, i) => i > 0),
      },
      {
        onSuccess: () => navigation.navigate('HostHubScreen'),
        onFailure: () => {
          Alert.alert(
            'Car is not found',
            'Your VIN code maybe wrong. Please input again',
            [{ text: 'OK', onPress: () => console.log('OK') }],
            { cancelable: false }
          );
          console.log('error');
        },
      }
    );
  };
  const handlePreviousCar = () => {
    getCustomerPreviousCarList(
      { id: user._id },
      {
        onSuccess: () => navigation.navigate('HostListCarScreen'),
        onFailure: () => {
          console.log('error');
        },
      }
    );
  };
  const handleScan = () => {
    navigation.navigate('HostScanCameraScreen');
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading}
    >
      <TouchableOpacity style={styles.container} onPress={handleScan}>
        <Text style={textStyle.bodyTextBold}> Scan VIN Code </Text>
      </TouchableOpacity>
      <Seperator />
      <InputForm
        label="VIN"
        value={vin}
        onChangeText={handleChangeVin}
        placeholder="Type VIN..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Using years"
        value={usingYears}
        onChangeText={handleChangeUsingYears}
        placeholder="Type using years..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Odometers"
        value={odometers}
        onChangeText={handleChangeOdometers}
        placeholder="Type odometers..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <ScrollView horizontal>
        {images.map((item, index) => (
          <ImageSelector
            data={item}
            onAddPress={handleAddImage}
            onRemovePress={handleRemoveImage}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
        onPress={handlePreviousCar}
      >
        <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
          Choose your previous car >>
        </Text>
      </TouchableOpacity>
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Next step"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHor(64),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowStyle.ELEVATION_3,
    backgroundColor: colors.white,
    marginVertical: scaleVer(15),
  },
});

export default connect(
  state => ({
    loading: state.lease.loading,
    user: state.user,
    vin: state.lease.vin,
    usingYears: state.lease.usingYears,
    odometers: state.lease.odometers,
  }),
  { checkCarByVin, getCustomerPreviousCarList, setValue }
)(HostScreen);
