import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ModalContainer, Button } from 'Components';
import QRCode from 'react-native-qrcode-svg';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';

type PropsType = {
  valueForQR: String,
  visible: Boolean,
  onClose: () => void,
  setGenerateNewQR: () => void,
};

const QRCodeGenModal = ({
  valueForQR,
  visible,
  onClose,
  setGenerateNewQR,
}: PropsType) => (
  <ModalContainer modalVisible={visible} onClose={onClose}>
    <View style={styles.modelContainer}>
      <View style={{ alignItems: 'center' }}>
        <QRCode
          value={valueForQR || 'N/A'}
          size={200}
          color="black"
          backgroundColor={colors.white}
        />
      </View>
      <Button
        label="Generate new code"
        onPress={() => setGenerateNewQR(true)}
        style={{ marginTop: scaleVer(24) }}
      />
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: colors.white,
    paddingVertical: scaleVer(32),
    paddingHorizontal: scaleHor(32),
    // height: scaleVer(256),
    width: scaleHor(256),
    borderRadius: 15,
    // alignContent: 'center',
    // justifyContent: 'center'
  },
});

export default QRCodeGenModal;
