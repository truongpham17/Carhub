import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import { NavigationType } from 'types';
import SearchMapInput, { ViewContainer, Button } from 'Components';
import { dimension } from 'Constants';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';

type PropTypes = {
  navigation: NavigationType,
};

const SelectMapScreen = ({ navigation }: PropTypes) => {
  const [search, setSearch] = useState('');
  const onBackPress = () => {
    navigation.pop();
  };
  const onChangeText = search => {
    setSearch(search);
  };

  const onTextFocus = () => {};

  return (
    <ViewContainer
      haveBackHeader
      title="Select location"
      onBackPress={onBackPress}
      safeArea={false}
      style={{
        paddingHorizontal: 0,
      }}
    >
      <SearchMapInput
        search={search}
        onChangeText={onChangeText}
        onTextFocus={onTextFocus}
        style={{
          position: 'absolute',
          top: scaleVer(12),
          alignSelf: 'center',
          zIndex: 2,
          width: dimension.SCREEN_WIDTH - 64,
          backgroundColor: colors.white,
        }}
      />
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: scaleVer(16),
          left: 0,
          right: 0,
          paddingHorizontal: scaleHor(24),
        }}
      >
        <Button label="Select" onPress={() => {}} />
        <SafeAreaView />
      </View>
    </ViewContainer>
  );
};

export default SelectMapScreen;
