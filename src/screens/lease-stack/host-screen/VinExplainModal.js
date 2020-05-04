import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { Button, ModalContainer } from 'Components';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';

type PropTypes = {
  modalVisible: boolean,
  onClose: () => void,
};

type StepType = {
  step: number,
  title: string,
  content: string,
};

const Step = ({ step, title, content }: StepType) => (
  <View style={styles.stepContainer}>
    <View style={styles.step}>
      <Text style={[textStyle.bodyText, { color: colors.primary }]}>
        {step}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={textStyle.bodyTextBold}>{title}</Text>
      <Text style={textStyle.bodyText}>{content}</Text>
    </View>
  </View>
);

const VinExplainModal = ({ modalVisible, onClose }: PropTypes) => (
  <ModalContainer modalVisible={modalVisible} onRequestClose={onClose}>
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Identification Number</Text>
      <Text style={[textStyle.bodyText, { marginBottom: scaleVer(20) }]}>
        We'll use your Ve hicle Identification Number (VIN) to identify your
        specific car. A VIN usually consists of 17 letters and numbers and has a
        barcode. It can be found in a few spots
      </Text>
      <Step
        step={1}
        title="Driver-side door"
        content="With the door open, look on the edge of the door or doorpost (where the door latches when it's closed)."
      />
      <Step
        step={2}
        title="Driver-side dashboard"
        content="Stand outside the caar and look through the windshield at the bottom corner of your dashboard."
      />
      <Step
        step={3}
        title="Documentation"
        content="Check your car title, registration, or insurance documents"
      />
      <Text style={[textStyle.bodyText, { marginVertical: scaleVer(12) }]}>
        If you still can't find your VIN, check your car manual or manufacture's
        website for instructions
      </Text>
      <Button
        label="I understand"
        onPress={onClose}
        colorEnd={colors.success}
        colorStart={colors.successLight}
      />
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    ...textStyle.widgetItem,
    marginBottom: scaleVer(12),
  },
  container: {
    width: '90%',
    backgroundColor: colors.white,
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    borderRadius: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: scaleVer(8),
  },
  step: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: scaleHor(12),
  },
});

export default VinExplainModal;
