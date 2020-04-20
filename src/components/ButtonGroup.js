import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import { textStyleObject } from 'Constants/textStyles';
import { defaultFunction } from 'Utils/common';
import colors from 'Constants/colors';

type PropTypes = {
  activeIndex: number,
  labels: [string],
  onItemPress: number => void,
  style?: StyleProp<ViewStyle>,
  dots: ?[Boolean],
};

const ButtonGroup = ({
  activeIndex,
  labels,
  onItemPress = defaultFunction,
  style = {},
  dots,
}: PropTypes) => (
  <View style={[styles.container, style]}>
    {labels.map((item, index) => (
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemPress(index)}
          key={index}
        >
          <Text
            style={[
              styles.label,
              index === activeIndex ? { color: colors.primary } : {},
            ]}
          >
            {labels[index]}
          </Text>
          {dots[index] ? <View style={styles.dot} /> : null}
        </TouchableOpacity>
        {index < labels.length - 1 ? <View style={styles.separator} /> : null}
      </>
    ))}
  </View>
);

export default ButtonGroup;

const styles = StyleSheet.create({
  container: {
    height: scaleHor(36),
    borderRadius: 4,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.dark80,
    alignSelf: 'stretch',
    overflow: 'hidden',
    marginHorizontal: -scaleHor(24),
  },

  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    ...textStyleObject.bodyTextBold,
    color: colors.dark60,
    fontSize: 16,
  },
  separator: {
    width: 1,
    height: scaleHor(28),
    backgroundColor: colors.dark80,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.errorLight,
    marginStart: 4,
  },
});
