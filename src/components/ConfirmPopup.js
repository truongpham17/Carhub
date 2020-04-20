import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
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
  acceptOnly?: boolean,
};

const ConfirmPopup = ({
  onConfirm,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Ok',
  onDecline,
  acceptOnly,
}: PropTypes) => {
  const renderAction = () => {
    if (acceptOnly) {
      return (
        <Button
          label={confirmLabel}
          style={{ borderRadius: 4, height: 36, marginTop: scaleVer(16) }}
          colorStart={colors.successLight}
          colorEnd={colors.success}
          onPress={onConfirm}
        />
      );
    }
    return (
      <View style={styles.action}>
        <Button
          label={cancelLabel}
          style={{ minWidth: 100, borderRadius: 4, height: 36 }}
          colorStart={colors.errorLight}
          colorEnd={colors.error}
          onPress={onDecline}
        />
        <Button
          onPress={onConfirm}
          label={confirmLabel}
          colorStart={colors.successLight}
          colorEnd={colors.success}
          style={{ minWidth: 100, borderRadius: 4, height: 36 }}
        />
      </View>
    );
  };
  return (
    <>
      <Text style={[textStyle.widgetItem, { textAlign: 'center' }]}>
        {title}
      </Text>
      <Text style={[textStyle.bodyText, { marginTop: scaleVer(12) }]}>
        {description}
      </Text>

      {renderAction()}
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

export default ConfirmPopup;
