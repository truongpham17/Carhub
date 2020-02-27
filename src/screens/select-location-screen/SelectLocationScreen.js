import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ViewContainer, SearchMapInput } from 'Components';
import { scaleHor } from 'Constants/dimensions';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { NavigationType } from 'types';
import SearchItem from './SearchItem';

type PropTypes = {
  navigation: NavigationType,
};

const data = [
  'Ho Chi Minh, District 1, 12 Quang Trung',
  'Ho Chi Minh, District 2, 15 Nguyen Thanh',
  'Ho Chi Minh, District 4, 12 Hoang Dai',
];

const SelectLocationScreen = ({ navigation }: PropTypes) => {
  const [search, setSearch] = useState('');
  const onChangeText = search => {
    setSearch(search);
  };
  const onTextFocus = () => {};
  const onBackPress = () => {
    navigation.pop();
  };

  const onSelectOnMap = () => {
    navigation.navigate('SelectMapScreen');
  };

  return (
    <ViewContainer haveBackHeader title="Search Car" onBackPress={onBackPress}>
      <SearchMapInput
        search={search}
        onChangeText={onChangeText}
        onTextFocus={onTextFocus}
      />

      <SearchItem
        label="Select on Maps"
        textStyleProps={textStyle.bodyTextBold}
        separator
        onPress={onSelectOnMap}
      />
      {data.map((item, index) => (
        <SearchItem
          label={item}
          separator={index !== data.length - 1}
          key={index}
        />
      ))}
    </ViewContainer>
  );
};

export default SelectLocationScreen;
