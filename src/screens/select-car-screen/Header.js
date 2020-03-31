import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';

const Header = () => (
  <View style={styles.header}>
    <View>
      <Text style={textStyle.widgetItem}>Ho Chi Minh, District 4</Text>
      <Text style={textStyle.bodyText}>Aug 20 - Sep 20</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={[textStyle.bodyText, { color: colors.dark40 }]}>Filter</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleVer(16),
    marginHorizontal: scaleHor(24),
  },
  button: {
    width: scaleHor(64),
    height: scaleHor(32),
    borderRadius: scaleHor(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dark80,
  },
});

export default Header;
