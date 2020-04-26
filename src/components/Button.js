import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { getSvg } from 'Assets/svgs';
import colors from 'Constants/colors';

type PropTypes = {
  onPress: () => void,
  label: string,
  gradient?: boolean,
  colorStart?: string,
  colorEnd?: string,
  style: StyleProp<ViewStyle>,
  containerStyle: StyleProp<ViewStyle>,
  textColor: string,
  iconOnly?: boolean,
  icon?: string,
  leftIcon?: string,
  disable?: boolean,
};

const Button = ({
  onPress,
  label = '',
  gradient = true,
  colorStart = colors.primaryLight,
  colorEnd = colors.primary,
  style,
  textColor = colors.white,
  iconOnly = false,
  icon = null,
  leftIcon = null,
  disable = false,
  containerStyle,
}: PropTypes) => {
  const buttonLabel = label.toUpperCase();
  if (gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[{ alignSelf: 'stretch' }, containerStyle]}
        disabled={disable}
      >
        <LinearGradient
          style={[styles.container, style]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={
            disable ? [colors.dark90, colors.dark80] : [colorStart, colorEnd]
          }
          locations={[0, 1]}
        >
          {!iconOnly && (
            <Text style={[textStyle.label, { color: textColor }]}>
              {buttonLabel}
            </Text>
          )}
          {getSvg(icon)}
          {leftIcon && <View style={styles.leftIcon}>{getSvg(leftIcon)}</View>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disable}
    >
      {!iconOnly && (
        <Text style={[textStyle.label, { color: textColor }]}>
          {buttonLabel}
        </Text>
      )}
      {getSvg(icon)}
      {leftIcon && <View style={styles.leftIcon}>{getSvg(leftIcon)}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHor(44),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleHor(22),
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  leftIcon: {
    left: scaleHor(16),
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default Button;
