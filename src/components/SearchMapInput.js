import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import { textStyleObject } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { defaultFunction } from 'Utils/common';

type PropTypes = {
  search: string,
  onChangeText: () => void,
  onTextFocus: () => void,
  style: StyleProp<ViewStyle>,
};

const SearchMapInput = ({
  search,
  onChangeText = defaultFunction,
  onTextFocus = defaultFunction,
  style,
}: PropTypes) => {
  const [hover, setHover] = useState(false);
  const onTextBlur = () => {
    setHover(false);
  };
  const handleTextFocus = () => {
    onTextFocus();
    setHover(true);
  };
  return (
    <TextInput
      value={search}
      onChangeText={onChangeText}
      style={[
        styles.textInput,
        hover ? { borderColor: colors.primary } : {},
        style,
      ]}
      placeholder="Enter location"
      autoFocus
      onFocus={handleTextFocus}
      onBlur={onTextBlur}
    />
  );
};

export default SearchMapInput;

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
