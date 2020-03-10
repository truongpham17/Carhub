import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  ListItem,
  Button,
  ImageSelector,
} from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { checkCarByVin } from '@redux/actions/hostCarModel';
import { selectImage } from 'Utils/images';
import Seperator from './Seperator';
import Extra from './Extra';

type PropTypes = {
  checkCarByVin: () => void,
  navigation: NavigationType,
  loading: Boolean,
};

const HostScreen = ({ checkCarByVin, navigation, loading }: PropTypes) => {
  const [vin, setVin] = useState('');
  const [usingYears, setUsingYears] = useState('');
  const [odometers, setOdometers] = useState('');
  const [images, setImages] = useState(['']);

  const handleChangeVin = vin => {
    setVin(vin);
  };
  const handleChangeUsingYears = usingYears => {
    setUsingYears(usingYears);
  };
  const handleChangeOdometers = odometers => {
    setOdometers(odometers);
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
      { vin, usingYears, odometers, images: images.filter((_, i) => i > 0) },
      {
        onSuccess: () => navigation.navigate('HostHubScreen'),
        onFailure: () => {},
      }
    );
  };
  const handlePreviousCar = () => {
    navigation.navigate('HostListCarScreen');
  };
  const handleScan = () => {};
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
      <View style={{ flexDirection: 'row' }}>
        {images.map((item, index) => (
          <ImageSelector
            data={item}
            onAddPress={handleAddImage}
            onRemovePress={handleRemoveImage}
          />
        ))}
      </View>
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
  },
});

export default connect(
  state => ({
    car: state.leaseRequest.car,
    loading: state.leaseRequest.loading,
  }),
  { checkCarByVin }
)(HostScreen);
