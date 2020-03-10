import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { scaleHor } from 'Constants/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { textStyleObject } from 'Constants/textStyles';
import { defaultFunction } from 'Utils/common';
import colors from 'Constants/colors';

type PropTypes = {
  activeIndex: number,
  labels: [string],
  onItemPress: number => void,
  style?: StyleProp<ViewStyle>,
};

const ButtonGroup = ({
  activeIndex,
  labels,
  onItemPress = defaultFunction,
  style = {},
}: PropTypes) => {
  const getRadiusStyle = index => {
    const length = labels.length - 1;
    if (index === 0) {
      return {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      };
    }
    if (index === length) {
      return {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      };
    }
    return {
      borderRadius: 4,
    };
  };

  const renderContent = (index: number) => {
    if (index === activeIndex) {
      return (
        <LinearGradient
          style={[styles.activeButton, getRadiusStyle(index)]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={[colors.primaryLight, colors.primary]}
          locations={[0, 1]}
          key={index}
        >
          <Text style={styles.activeLabel}>{labels[index]}</Text>
        </LinearGradient>
      );
    }
    return <Text style={styles.label}>{labels[index]}</Text>;
  };

  return (
    <View style={[styles.container, style]}>
      {labels.map((item, index) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => onItemPress(index)}
          key={index}
        >
          {renderContent(index)}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ButtonGroup;

const styles = StyleSheet.create({
  container: {
    height: scaleHor(44),
    borderRadius: 4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.dark60,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  activeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...textStyleObject.bodyText,
    color: colors.dark10,
  },
  activeLabel: {
    ...textStyleObject.bodyText,
    color: colors.white,
  },
});
