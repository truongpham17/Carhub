import React from 'react';
import { View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scaleHor } from 'Constants/dimensions';
import { Edit } from 'Assets/svgs';
import { defaultFunction } from 'Utils/common';

type PropTypes = {
  uri: string,
  style: StyleProp<ViewStyle>,
  editable?: boolean,
  onAvatarPress?: () => void,
};

const Avatar = ({
  uri,
  style = {},
  editable = false,
  onAvatarPress = defaultFunction,
}: PropTypes) => {
  const renderContent = () => (
    <FastImage
      source={{ uri }}
      style={[
        {
          width: scaleHor(100),
          height: scaleHor(100),
          borderRadius: scaleHor(50),
          // backgroundColor: 'green',
        },
        style,
      ]}
      resizeMode="cover"
    />
  );
  if (!editable) return renderContent();
  return (
    <TouchableOpacity onPress={onAvatarPress}>
      {renderContent()}
      <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
        <Edit />
      </View>
    </TouchableOpacity>
  );
};

export default Avatar;
