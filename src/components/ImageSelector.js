import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { Remove, AddImage } from 'Assets/svgs';
import { shadowStyle } from 'Constants';
import { textStyleObject } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { defaultFunction } from 'Utils/common';

type PropTypes = {
  style: StyleProp<ViewStyle>,
  data?: { uri: string, key: string },
  onRemovePress?: () => void,
  onAddPress: () => void,
};

const ImageSelector = ({
  style,
  data,
  onRemovePress = defaultFunction,
  onAddPress,
}: PropTypes) => {
  const handleRemovePress = () => {
    onRemovePress(data.key);
  };
  if (!data) {
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.empty} onPress={onAddPress}>
          <AddImage />
          <Text style={styles.text}>ADD IMAGES</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.img}>
        <Image
          source={{ uri: data.uri }}
          style={{ flex: 1 }}
          resizeMode="center"
        />
      </View>

      <TouchableOpacity style={styles.remove} onPress={handleRemovePress}>
        <Remove />
      </TouchableOpacity>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 4,
    ...shadowStyle.ELEVATION_3,
  },
  container: {
    width: scaleHor(130),
    height: scaleHor(130),
    padding: scaleHor(10),
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  empty: {
    flex: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark80,
  },
  text: {
    ...textStyleObject.bodyTextBold,
    fontSize: 10,
    color: colors.white,
    marginTop: scaleVer(8),
  },
});
