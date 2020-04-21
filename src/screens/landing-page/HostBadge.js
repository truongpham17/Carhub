import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle, dimension } from 'Constants';
import { SearchIllustrator } from 'Assets/svgs';
import { NavigationType } from 'types';
import { carWheel } from 'Assets/images';
import { Icon } from 'react-native-elements';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { InputForm, Button } from 'Components';

type PropTypes = { navigation: NavigationType };

const HostBadge = ({ navigation }: PropTypes) => (
  <View style={styles.container}>
    <Text style={styles.text}>Earn money by placing</Text>
    <Text style={styles.text}>your car at the hub</Text>
    <TouchableOpacity
      style={styles.search}
      onPress={() => navigation.navigate('LeaseStack')}
    >
      <Text style={textStyle.bodyText}>Start now</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -scaleHor(24),
    width: dimension.SCREEN_WIDTH,
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

export default HostBadge;
