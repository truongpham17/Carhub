import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { checkCarByVin } from '@redux/actions/carModel';
import Seperator from './Seperator';
import Extra from './Extra';

type CarType = {
  vin: String,
  usingYears: Number,
  odometer: Number,
};

type PropTypes = {
  car: [CarType],
  checkCarByVin: ({ vin: String }) => void,
  navigation: NavigationType,
  loading: Boolean,
};

const HostScreen = ({ car, checkCarByVin, navigation, loading }: PropTypes) => {
  const [vin, setVin] = useState('');
  const [usingYears, setUsingYears] = useState('');
  const [odometers, setOdometers] = useState('');

  const handleChangeVin = vin => {
    setVin(vin);
  };
  const handleChangeUsingYears = usingYears => {
    setUsingYears(usingYears);
  };
  const handleChangeOdometers = odometers => {
    setOdometers(odometers);
  };
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    // checkCarByVin(
    //   { vin, usingYears, odometers },
    //   {
    //     onSuccess: () => navigation.navigate('HostHubScreen'),
    //     onFailure: () => {},
    //   }
    // );
    navigation.navigate('HostHubScreen');
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
      <Extra />
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
    car: state.carModelRequest.car,
    loading: state.carModelRequest.loading,
  }),
  { checkCarByVin }
)(HostScreen);
