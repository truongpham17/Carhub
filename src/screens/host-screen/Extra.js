import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';

const Extra = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: scaleVer(32),
      justifyContent: 'space-between',
    }}
  >
    <Text style={[textStyle.label, { color: colors.dark20 }]}>Extras</Text>
    <TouchableOpacity style={{}}>
      <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
        ADD
      </Text>
    </TouchableOpacity>
  </View>
);

export default Extra;
