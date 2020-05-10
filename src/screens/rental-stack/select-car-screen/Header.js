import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { formatDate } from 'Utils/date';

type HeaderProps = {
  startLocation: {
    address: string,
  },
  startDate: Date,
  endDate: Date,
};

const Header = ({ data }: { data: HeaderProps }) => (
  <View style={styles.header}>
    <View>
      <Text style={textStyle.widgetItem}>{data.startLocation.address}</Text>
      <Text style={textStyle.bodyText}>
        {formatDate(data.startDate)} - {formatDate(data.endDate)}
      </Text>
    </View>
    {/* <TouchableOpacity style={styles.button}>
      <Text style={[textStyle.bodyText, { color: colors.dark40 }]}>Filter</Text>
    </TouchableOpacity> */}
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
