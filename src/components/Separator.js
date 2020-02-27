import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import colors from 'Constants/colors';

type PropsType = {
  style: StyleProp<ViewStyle>,
};
const Separator = ({ style }: PropsType) => (
  <View style={[styles.separator, style]}></View>
);

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dark20,
    width: '90%',
    alignSelf: 'center',
  },
});

export default Separator;
