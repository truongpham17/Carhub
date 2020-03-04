import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';

const Seperator = () => (
  <View
    style={{
      flexDirection: 'row',
      alignSelf: 'stretch',
      marginTop: scaleVer(32),
      alignItems: 'center',
    }}
  >
    <View
      style={{
        backgroundColor: colors.dark60,
        height: 1,
        width: '45%',
      }}
    />
    <Text style={textStyle.bodyText}>OR</Text>
    <View
      style={{
        backgroundColor: colors.dark60,
        height: 1,
        width: '45%',
      }}
    />
  </View>
);

export default Seperator;
