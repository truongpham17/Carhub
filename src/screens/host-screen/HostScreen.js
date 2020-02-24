import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import Seperator from './Seperator';
import Extra from './Extra';

type PropTypes = {
  navigation: NavigationType,
};

const HostScreen = ({ navigation }: PropTypes) => {
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    navigation.navigate('HostListCarScreen');
  };
  const handleScan = () => {};
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      backAction={onPressBack}
    >
      <TouchableOpacity style={styles.container} onPress={handleScan}>
        <Text style={textStyle.bodyTextBold}> Scan VIN Code </Text>
      </TouchableOpacity>
      <Seperator />
      <InputForm
        label="VIN"
        placeholder="Type VIN..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Using years"
        placeholder="Type using years..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <InputForm
        label="Odometers"
        placeholder="Type odometers..."
        containerStyle={{ marginVertical: scaleVer(16) }}
      />
      <Extra />
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
      >
        <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
          Choose your previous car >>
        </Text>
      </TouchableOpacity>
      <Button
        style={{ marginTop: scaleVer(32) }}
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

export default HostScreen;
