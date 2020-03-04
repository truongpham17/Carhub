import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';
import { scaleHor } from 'Constants/dimensions';
import { textStyleObject } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { NavigationType } from 'types';

type PropTypes = {
  navigation: NavigationType,
};

const data = [{}];

const SelectLocationScreen = ({ navigation }: PropTypes) => {
  const [search, setSearch] = useState('');
  const [hover, setHover] = useState(false);
  const onChangeText = search => {
    setSearch(search);
  };
  const onTextFocus = () => {
    setHover(true);
  };
  const onTextBlur = () => {
    setHover(false);
  };
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer haveBackHeader title="Search Car" backAction={onBackPress}>
      <TextInput
        value={search}
        onChangeText={onChangeText}
        style={[styles.textInput, hover ? { borderColor: colors.primary } : {}]}
        placeholder="Enter location"
        autoFocus
        onFocus={onTextFocus}
        onBlur={onTextBlur}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: scaleHor(8),
    height: scaleHor(44),
    borderRadius: 4,
    borderWidth: 1,
    ...textStyleObject.bodyText,
    color: colors.dark20,
    borderColor: colors.dark60,
  },
});

export default SelectLocationScreen;
