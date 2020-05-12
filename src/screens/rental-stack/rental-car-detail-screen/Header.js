import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import Separator from 'Components/Separator';

type PropTypes = {
  name: String,
  type: String,
  price: Number,
  star: Number,
  trip: Number,
  total: Number,
};

const Header = ({ name, type, price, star, trip, total }: PropTypes) => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View>
        <Text style={textStyle.widgetItem}>{name}</Text>
        <Text style={[textStyle.label, { color: colors.dark40 }]}>{type}</Text>
      </View>
      <View>
        <Text style={textStyle.widgetItem}>{price}/day</Text>
      </View>
    </View>
    <View style={styles.itemContainer}>
      <Text>
        <Text style={textStyle.bodyTextBold}>{star} stars</Text> ({trip} trips)
      </Text>
      <Text>
        Total: <Text style={textStyle.widgetItem}>{total}$</Text>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleVer(5),
  },
  container: {
    paddingBottom: scaleVer(12),
    borderBottomWidth: 1,
    borderColor: colors.dark80,
  },

  libertyContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default Header;
