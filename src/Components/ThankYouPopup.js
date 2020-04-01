import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from 'Constants/colors';
import { scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import ModalContainer from './ModalContainer';
import Button from './Button';

type PropTypes = {
  msg: string,
  detail: String,
  visible: Boolean,
  onClose: () => void,
  onConfirm: () => void,
};

const ThankYouPopup = ({
  msg,
  detail,
  visible,
  onClose,
  onConfirm,
}: PropTypes) => (
  <ModalContainer
    modalVisible={visible}
    onClose={onClose}
    grantResponder={false}
  >
    <View style={styles.container}>
      <Text style={[textStyle.widgetTitle, { textAlign: 'center' }]}>
        {msg}
      </Text>
      <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
        {detail}
      </Text>
      <Button
        label="Ok"
        onPress={onConfirm}
        colorStart={colors.successLight}
        colorEnd={colors.success}
      />
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: scaleHor(16),
    paddingTop: scaleHor(32),
  },
});

export default ThankYouPopup;
