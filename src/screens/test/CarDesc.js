import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { Rating } from 'react-native-elements';

type PropTypes = {
  carName: String,
  carType: String,
  pricePerDay: String,
  total: String,
  rating: Number,
};

const CarDesc = ({
  carName,
  carType,
  pricePerDay,
  total,
  rating,
}: PropTypes) => (
  <View style={styles.container}>
    <View style={styles.descItem}>
      <Text style={textStyle.widgetItem}>{carName}</Text>
      <Text style={textStyle.widgetItem}>{pricePerDay}</Text>
    </View>
    <View style={styles.descItem}>
      <Text style={textStyle.label}>{carType}</Text>
    </View>
    <View style={styles.descItem}>
      <View style={styles.ratingCom}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={20}
          readonly
          startingValue={5}
          style={{ marginRight: 5 }}
        />
        <Text style={textStyle.bodyText}>{rating}</Text>
      </View>
      <Text style={textStyle.label}>
        Total: <Text style={textStyle.widgetItem}>{total}</Text>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  descItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  ratingCom: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CarDesc;
