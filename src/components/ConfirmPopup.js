import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { dimension } from 'Constants';
import { textStyle } from 'Constants/textStyles';
import ModalContainer from './ModalContainer';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
};

const ConfirmPopup = ({
  modalVisible,
  onClose,
  onConfirm,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Ok',
}: PropTypes) => (
  <ModalContainer modalVisible={modalVisible} onClose={onClose}>
    <View style={styles.containerStyle}>
      <Text style={textStyle.widgetItem}>{title}</Text>
      <Text style={textStyle.bodyText}>{description}</Text>
      <View style={styles.action}>
        <TouchableOpacity style={styles.item} onPress={onClose}>
          <Text style={textStyle.bodyText}>{cancelLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onConfirm}>
          <Text style={textStyle.bodyText}>{confirmLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
    height: 160,
    // alignItems: 'center',
    // justifyContent: 'center'
    padding: dimension.DISTANCE_3,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  item: {
    padding: 4,
    marginEnd: 4,
  },
});

export default ConfirmPopup;
