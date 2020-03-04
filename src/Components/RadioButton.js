import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const DEFAULT_SIZE_MULTIPLIER = 0.7;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2;

type PropTypes = {
  size: number,
  innerColor: string,
  outerColor: string,
  isSelected: Boolean,
  onPress: () => void,
};

const RadioButton = ({
  size = 12,
  innerColor = 'white',
  outerColor = 'white',
  isSelected = false,
  onPress = () => null,
}: PropTypes) => {
  const outerStyle = {
    borderColor: outerColor,
    width: size + size * DEFAULT_SIZE_MULTIPLIER,
    height: size + size * DEFAULT_SIZE_MULTIPLIER,
    borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
    borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER,
  };

  const innerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: innerColor,
  };

  return (
    <TouchableOpacity style={[styles.radio, outerStyle]} onPress={onPress}>
      {isSelected ? <View style={innerStyle} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default RadioButton;
