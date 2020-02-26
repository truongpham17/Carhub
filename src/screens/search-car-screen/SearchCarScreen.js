import React from 'react';
import { View } from 'react-native';
import { ViewContainer, InputForm, DatePicker } from 'components';
import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const SearchCarScreen = () => {
  const onBackPress = () => {};
  return (
    <ViewContainer haveBackTitle title="Search Car" backAction={onBackPress}>
      <InputForm label="pick up hub location" placeholder="Enter location" />
      <InputForm label="pick up hub location" placeholder="Enter location" />
      <DatePicker />
    </ViewContainer>
  );
};

export default SearchCarScreen;
