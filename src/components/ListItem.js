import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Switch,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { defaultFunction } from 'Utils/common';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { getSvg } from 'Assets/svgs';
import { textStyle, textStyleObject } from 'Constants/textStyles';
import colors from 'Constants/colors';

type PropTypes = {
  icon?: string,
  label?: string,
  nextIcon?: string,
  onItemPress?: () => void,
  showSeparator?: boolean,
  type: 'text' | 'toggle' | 'detail',
  detail?: string,
  pressable?: boolean,
  containerStyle: StyleProp<ViewStyle>,
};

const ListItem = ({
  icon,
  label = '',
  nextIcon,
  onItemPress = defaultFunction,
  showSeparator = false,
  type = 'text',
  detail,
  containerStyle,
  pressable = false,
}: PropTypes) => {
  const getAction = () => {
    switch (type) {
      case 'text':
        return getSvg(nextIcon, { fill: colors.dark20 });
      case 'toggle':
        return <Switch value />;
      case 'detail':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text
              style={[
                styles.detail,
                nextIcon ? { marginEnd: scaleHor(8) } : {},
              ]}
            >
              {detail}
              {/* {detail.length > 20 ? `${detail.substr(0, 19)}...` : detail} */}
            </Text>
            {getSvg(nextIcon, { fill: colors.dark20 })}
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        showSeparator ? styles.separator : {},
        containerStyle,
      ]}
      onPress={onItemPress}
      disabled={!pressable}
    >
      <View style={styles.labelContainer}>
        {icon && (
          <View style={{ marginEnd: scaleHor(16), width: scaleHor(16) }}>
            {getSvg(icon, { fill: colors.dark20 })}
          </View>
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      {getAction()}
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    // minHeight: scaleHor(60),
    paddingVertical: scaleHor(20),
    paddingHorizontal: scaleHor(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  label: {
    ...textStyleObject.bodyTextBold,
    color: colors.dark20,
    marginEnd: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    ...textStyleObject.bodyText,
    color: colors.dark20,
    textAlign: 'right',
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dark90,
  },
});
