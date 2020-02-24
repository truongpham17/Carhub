import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { SearchBar } from 'react-native-elements';

type PropTypes = () => {
  navigation: NavigationType,
};

const HostListCarScreen = ({ navigation }: PropTypes) => {
  const updateSearch = () => {};
  return (
    <View>
      <SearchBar placeholder="Car name..." onChangeText={updateSearch} />
    </View>
  );
};

export default HostListCarScreen;
