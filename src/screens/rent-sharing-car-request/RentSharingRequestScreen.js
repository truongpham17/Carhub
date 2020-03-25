import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType } from 'types';

type PropsType = {
  navigation: NavigationType,
};

const RentSharingRequestScreen = ({ navigation }: PropsType) => {
  const a = 0;
  return (
    <ViewContainer>
      <View />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({});

export default RentSharingRequestScreen;
