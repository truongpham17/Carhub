import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';
import { ViewContainer, MapAutoCompleteSearch } from 'Components';
import { scaleHor } from 'Constants/dimensions';
import Geolocation from '@react-native-community/geolocation';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { NavigationType } from 'types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { requestPermission } from 'services/permission';
import { getCurrentPosition } from 'services/maps';
import SearchItem from './SearchItem';

const SELECT_ON_MAPS = 'Select on Maps';

const CURRENT_LOCATION = 'Current location';

type PropTypes = {
  navigation: NavigationType,
};

const SelectLocationScreen = ({ navigation }: PropTypes) => {
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer haveBackHeader title="Search Car" onBackPress={onBackPress}>
      <MapAutoCompleteSearch
        onRequestMap={() => navigation.navigate('SelectMapScreen')}
        onSelectLocation={location => console.log(location)}
      />
    </ViewContainer>
  );
};

export default SelectLocationScreen;
