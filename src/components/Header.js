import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { textStyleObject } from 'Constants/textStyles';
import { ArrowReturn, getSvg, X } from 'Assets/svgs';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';

type PropTypes = {
  haveBack: boolean,
  title: string,
  haveRight?: boolean,
  rightIcon?: string,
  onRightPress?: () => void,
  previous?: string,
  componentId: string,
  animation: 'leftToRight' | 'normal',
  backType: 'back' | 'exit',
  onBackPress: () => void,
  style: {},
};

const BackTitle = ({
  title,
  haveBack,
  haveRight,
  rightIcon,
  onRightPress,
  onBackPress,
  backType = 'back',
  style,
}: PropTypes) => (
  <View style={[styles.title, style]}>
    <SafeAreaView />
    {haveBack && (
      <TouchableOpacity onPress={onBackPress} style={styles.arrow}>
        {backType === 'back' ? <ArrowReturn fill={colors.dark20} /> : <X />}
      </TouchableOpacity>
    )}
    <Text style={styles.titleText}>{title}</Text>

    {haveRight && (
      <TouchableOpacity style={styles.rightComponent} onPress={onRightPress}>
        {getSvg(rightIcon)}
      </TouchableOpacity>
    )}
  </View>
);
const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingBottom: scaleVer(32),
  },
  arrow: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 12,
    // width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightComponent: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 8,
  },
  titleText: {
    ...textStyleObject.widgetItem,
    color: colors.dark20,
  },
});

export default BackTitle;
