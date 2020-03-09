import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import colors from 'Constants/colors';
import { scaleVer } from 'Constants/dimensions';

type PropsType = {
  style: StyleProp<ViewStyle>,
};
const Separator = ({ style }: PropsType) => (
  <View style={[styles.separator, style]}></View>
);

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dark90,
    width: '100%',
    alignSelf: 'center',
  },
});

export default Separator;
