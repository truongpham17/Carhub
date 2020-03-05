import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalContainer from 'Components/ModalContainer';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import { X, getSvg } from 'Assets/svgs';
import { defaultFunction } from 'Utils/common';
import colors from 'Constants/colors';

type PropTypes = {
  visible: boolean,
  title: string,
  onClose: () => void,
  children: React.Node,
  leftIcon?: string,
  haveCloseIcon?: boolean,
};

const PopupForm = ({
  visible,
  title,
  onClose = defaultFunction,
  children,
  leftIcon,
  haveCloseIcon = true,
}: PropTypes) => (
  <ModalContainer modalVisible={visible} onClose={onClose}>
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={{ flexDirection: 'row' }}>
          {leftIcon && getSvg(leftIcon)}
          <Text style={[styles.textTitle, leftIcon ? {} : { marginStart: 0 }]}>
            {title}
          </Text>
        </View>
        {haveCloseIcon && (
          <TouchableOpacity style={styles.x} onPress={onClose}>
            <X />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  </ModalContainer>
);

export default PopupForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    alignSelf: 'stretch',
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: scaleHor(16),
  },

  x: {
    padding: scaleHor(4),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleVer(24),
    justifyContent: 'space-between',
  },
  textTitle: {
    ...textStyle.widgetItem,
    color: colors.dark,
    marginStart: scaleHor(4),
  },
});
