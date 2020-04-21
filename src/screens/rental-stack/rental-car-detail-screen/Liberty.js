import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';

import { Icon } from 'react-native-elements';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import ItemContainer from './ItemContainer';

type PropTypes = {
  data: [{ icon: { name: String, type: String }, value: String }],
};

const Liberty = ({ data }: PropTypes) => (
  <ItemContainer title="Liberty mutual">
    {data.map((item, index) => (
      <View key={index}>
        <Icon type="feather" {...item.icon} style={{ marginBottom: 4 }} />
        <Text style={textStyle.bodyText}>{item.value}</Text>
      </View>
    ))}
  </ItemContainer>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleVer(16),
    borderBottomWidth: 1,
    borderColor: colors.dark80,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Liberty;
