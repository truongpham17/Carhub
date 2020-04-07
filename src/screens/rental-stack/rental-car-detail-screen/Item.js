import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getSvg } from 'Assets/svgs';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import ItemContainer from './ItemContainer';

type PropTypes = {
  title: String,
  data: [
    {
      icon?: string,
      value: String,
      style: {},
    }
  ],
  showAction?: Boolean,
  actionLabel?: String,
  onActionPress?: () => void,
};

const Item = ({
  title,
  data,
  showAction,
  actionLabel,
  onActionPress,
}: PropTypes) => (
  <ItemContainer title={title}>
    <View style={{ alignSelf: 'stretch', flex: 1 }}>
      {data.map((item, index) => (
        <View style={{ flexDirection: 'row' }}>
          {item.icon && (
            <View style={{ marginEnd: scaleHor(4) }}>getSvg(item.icon)</View>
          )}
          <Text
            style={[
              textStyle.bodyText,
              { width: '80%' },
              index === data.length - 1 ? {} : { marginBottom: 4 },
              item.style,
            ]}
          >
            {item.value}
          </Text>
        </View>
      ))}
    </View>

    {showAction && (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={[textStyle.bodyTextBold, { color: colors.success }]}>
          {actionLabel}
        </Text>
      </TouchableOpacity>
    )}
  </ItemContainer>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaleVer(16),
    borderBottomWidth: 1,
    borderColor: colors.dark80,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: scaleHor(4),
    justifyContent: 'space-between',
  },
});

export default Item;
