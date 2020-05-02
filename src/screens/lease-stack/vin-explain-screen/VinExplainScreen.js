import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer } from 'Components';

import { useDispatch } from 'react-redux';

import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const VinExplainScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer haveBackHeader title="Vin code" onBackPress={onBackPress}>
      <Text>
        We'll use your Ve hicle Identification Number (VIN) to identify your
        specific car. A VIN usually consists of 17
      </Text>
    </ViewContainer>
  );
};

export default VinExplainScreen;
const styles = StyleSheet.create({});
