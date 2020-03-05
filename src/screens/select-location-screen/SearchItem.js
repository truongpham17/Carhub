import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';

type PropTypes = {
  label: String,
  textStyleProps: {},
  separator: boolean,
  onPress: () => void,
};

const SearchItem = ({
  label,
  textStyleProps,
  separator,
  onPress,
}: PropTypes) => (
  <View>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[textStyle.bodyText, textStyleProps]}>{label}</Text>
    </TouchableOpacity>
    {separator && <View style={styles.separator} />}
  </View>
);

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    height: scaleVer(64),
    justifyContent: 'center',
    paddingStart: scaleHor(8),
  },
  separator: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: colors.dark80,
  },
});
