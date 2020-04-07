import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { shadowStyle, color } from 'Constants';

type PropTypes = {
  date: String,
  detail: String,
  isFirst: Boolean,
};

const TimeLineItem = ({ date, detail, isFirst }: PropTypes) => (
  <View style={styles.container}>
    <View style={{ width: 24, marginEnd: 32 }}>
      <View style={styles.line} />
      <View style={styles.dotContainer}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#FF752F',
          }}
        />
      </View>
      <View style={styles.line} />
    </View>
    <View style={{ flex: 2, justifyContent: 'center' }}>
      <Text style={textStyle.widgetItem}>{detail}</Text>
      <Text style={textStyle.bodyText}>{date}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginBottom: 24,
  },
  dotContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    alignSelf: 'center',
    width: 1,
    height: 32,
    backgroundColor: colors.dark60,
  },
});

export default TimeLineItem;
