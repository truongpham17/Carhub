import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import InputForm from './InputForm';
import Button from './Button';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description: string,
  cancelLabel?: string,
  confirmLabel?: string,
  onDecline: () => void,
  defaultValue: ?String,
};

const PromptDialog = ({
  onConfirm,
  onDecline,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Ok',
  defaultValue = '',
}: PropTypes) => {
  const [text, setText] = useState(defaultValue);
  return (
    <>
      <Text style={textStyle.widgetItem}>{title}</Text>
      <InputForm
        label={description}
        value={text}
        onChangeText={text => setText(text)}
        containerStyle={{ width: '100%', marginTop: scaleVer(12) }}
        autoFocus
      />
      <View style={styles.action}>
        <Button
          label={cancelLabel}
          style={{ minWidth: 100, borderRadius: 4, height: 36 }}
          colorStart={colors.errorLight}
          colorEnd={colors.error}
          onPress={onDecline}
        />
        <Button
          onPress={() => onConfirm(text)}
          label={confirmLabel}
          colorStart={colors.successLight}
          colorEnd={colors.success}
          style={{ minWidth: 100, borderRadius: 4, height: 36 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '80%',
    // alignItems: 'center',
    // justifyContent: 'center'
    padding: scaleHor(16),
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleVer(16),
    alignSelf: 'stretch',
  },
  item: {
    padding: 4,
    marginEnd: 4,
  },
});

export default PromptDialog;
