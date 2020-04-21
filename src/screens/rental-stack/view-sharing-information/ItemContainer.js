import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getSvg } from 'Assets/svgs';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  title: String,
  children: React.Node,
};

const ItemContainer = ({ title, children }: PropTypes) => (
  <View style={styles.container}>
    <Text
      style={[
        textStyle.widgetItem,
        { marginBottom: scaleVer(12), fontSize: 14 },
      ]}
    >
      {title.toUpperCase()}
    </Text>
    <View style={styles.contentContainer}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleVer(16),
    borderBottomWidth: 1,
    borderColor: colors.dark80,
  },
  contentContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});

export default ItemContainer;
