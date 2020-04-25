import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle, dimension } from 'Constants';
import { NavigationType } from 'types';
import { Icon } from 'react-native-elements';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { InputForm } from 'Components';

type PropTypes = {
  navigation: NavigationTYpe,
};

const RentalBadge = ({ navigation }: PropTypes) => (
  <View style={styles.container}>
    {/* <Image source={carImage} style={styles.image} /> */}

    <Text style={styles.text}>Find the best rental</Text>
    <Text style={styles.text}>car at your place</Text>
    <TouchableOpacity
      style={styles.search}
      onPress={() => navigation.navigate('RentalStack')}
    >
      <Icon name="magnifying-glass" type="entypo" color={colors.dark60} />
      <Text style={textStyle.bodyText}> City, airport, address, or hotel</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -scaleHor(24),
    width: dimension.SCREEN_WIDTH,
    height: 240,
    overflow: 'hidden',
    marginVertical: scaleVer(12),
    // height: '40%',
    justifyContent: 'center',
  },
  text: {
    ...textStyleObject.widgetItem,
    textAlign: 'center',
    color: colors.white,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  search: {
    alignSelf: 'stretch',
    marginHorizontal: scaleHor(12),
    height: 48,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: scaleVer(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RentalBadge;
