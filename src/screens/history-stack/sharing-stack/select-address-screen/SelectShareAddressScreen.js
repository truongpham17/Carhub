import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';
import {
  ViewContainer,
  MapAutoCompleteSearch,
  ProgressStep,
  Button,
} from 'Components';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { useDispatch } from 'react-redux';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import { NavigationType, GeoLocationType } from 'types';
import { setSharingData } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
};

const SelectShareAddressScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null);
  const onBackPress = () => {
    navigation.pop();
  };

  const handleNextStep = () => {
    setSharingData(dispatch)({ address });
    navigation.navigate('SharingConfirmationScreen');
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Select share address"
      onBackPress={onBackPress}
    >
      <View style={{ flex: 1 }}>
        <ProgressStep
          labels={['Time', 'Price', 'Address', 'Complete']}
          currentStep={2}
          style={{ marginBottom: scaleVer(4) }}
          titleStyle={{ paddingStart: scaleHor(12), paddingEnd: 0 }}
          headerStyle={{ paddingHorizontal: scaleHor(12) }}
        />

        <Text style={[textStyle.widgetItem, { marginVertical: scaleVer(32) }]}>
          Please choose address that other can come to get your car
        </Text>

        <MapAutoCompleteSearch
          placeholder="Address"
          navigation={navigation}
          onSelectLocation={address => {
            setAddress(address);
          }}
        />
      </View>

      <Button
        label="Next step"
        style={{ marginBottom: scaleVer(12) }}
        onPress={handleNextStep}
        disable={!address}
      />
    </ViewContainer>
  );
};

export default SelectShareAddressScreen;
