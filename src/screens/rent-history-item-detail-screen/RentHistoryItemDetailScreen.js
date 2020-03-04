import React from 'react';
import { View } from 'react-native';
import { ViewContainer } from 'Components';
import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const RentHistoryItemDetailScreen = ({ navigation }: PropTypes) => {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <ViewContainer haveBackHeader title="Detail" backAction={onBackPress}>
      <View />
    </ViewContainer>
  );
};

export default RentHistoryItemDetailScreen;
