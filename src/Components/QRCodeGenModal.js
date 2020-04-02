import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from 'Constants/colors';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import moment from 'moment';
import Button from './Button';
import ModalContainer from './ModalContainer';

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
}: PropsType) => {
  // useEffect(() => {
  //   handleTimer();
  // }, [timer]);

  const handleGenerateNewCode = () => {
    setGenerateNewQR(true);
  };

  // const handleTimer = () => {
  //   if (!valueForQR) return;
  //   const { expired } = JSON.parse(valueForQR);
  //   const time = moment.duration(expired - Date.now());
  //   setTimer(time.minutes() * 60 + time.seconds());
  //   if (expired === Date.now()) {
  //     onClose();
  //   }
  // };

  return (
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
          onPress={handleGenerateNewCode}
          style={{ marginTop: scaleVer(24) }}
        />
      </View>
    </ModalContainer>
  );
};

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
