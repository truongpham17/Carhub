import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { SearchBar, Icon } from 'react-native-elements';

type PropTypes = () => {
  navigation: NavigationType,
};

const HostListCarScreen = ({ navigation }: PropTypes) => {
  const updateSearch = () => {};
  const clearSearch = () => {};
  const onPressBack = () => {
    navigation.pop();
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Car list"
      onBackPress={onPressBack}
    >
      <SearchBar
        // inputStyle={{ backgroundColor: 'white' }}
        containerStyle={{
          borderWidth: 1,
          borderRadius: 24,
          height: scaleVer(60),
          borderColor: colors.dark80,
          justifyContent: 'center',
        }}
        platform="android"
        onChangeText={updateSearch}
        onClearText={clearSearch}
        placeholder="Car name..."
      />
    </ViewContainer>
  );
};

export default HostListCarScreen;
