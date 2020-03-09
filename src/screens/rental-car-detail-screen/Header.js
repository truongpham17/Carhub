import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import Separator from 'Components/Separator';

const Header = () => (
  <View style={styles.container}>
    <View style={styles.itemContainer}>
      <View>
        <Text style={textStyle.widgetItem}>Audi V4</Text>
        <Text style={[textStyle.label, { color: colors.dark40 }]}>
          Exclusive Car
        </Text>
      </View>
      <View>
        <Text style={textStyle.widgetItem}>50$/day</Text>
      </View>
    </View>
    <View style={styles.itemContainer}>
      <Text>
        <Text style={textStyle.bodyTextBold}>4.95 stars</Text> (46 trips)
      </Text>
      <Text>
        Total: <Text style={textStyle.widgetItem}>500$</Text>
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
