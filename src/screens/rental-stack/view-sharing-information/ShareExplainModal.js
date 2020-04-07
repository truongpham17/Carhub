import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ModalContainer, Button } from 'Components';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { CheckBox } from 'react-native-elements';
import { textStyle, textStyleObject } from 'Constants/textStyles';

type PropTypes = {
  visible: Boolean,
  onClose: () => void,
  onSeeDetail: () => void,
  hubAddress: string,
  returnTime: string,
  onPressBack: () => void,
};
const SharingExplainModel = ({
  visible,
  onClose,
  onSeeDetail,
  hubAddress,
  returnTime,
  onPressBack,
}: PropTypes) => {
  const [checked, setChecked] = useState(false);
  return (
    <ModalContainer
      modalVisible={visible}
      onClose={onClose}
      grantResponder={false}
    >
      <View style={styles.container}>
        <Text style={styles.widget}>Hire a sharing car</Text>
        <Text style={styles.text}>
          Please carefully read these policies before you decide to hire this
          car
        </Text>
        <Text style={styles.text}>
          You will take all the responsibilities belong to this car. All the
          damages, problems when you return this car to the hub will be counted
          as your responsibilities. So remember to check this car carefully
          before you confirm receiving this car.
        </Text>
        <Text style={styles.text}>
          You have to pay in advance to request hiring this car. If you cancel
          request, your money will be refund, but you will lost some money
          because of Paypal transaction fee.
        </Text>
        <Text style={styles.text}>
          When you successfully hire this car, to need to return the car to the
          hub at {hubAddress} before {returnTime}. Otherwise you will pay some
          extra money for returning late.
        </Text>
        <View style={{ alignItems: 'flex-end', marginTop: scaleVer(12) }}>
          <CheckBox
            title="I confirm that I've carefully read these information"
            checked={checked}
            onPress={() => setChecked(checked => !checked)}
            containerStyle={{
              margin: 0,
            }}
            center={false}
          />
        </View>

        <Button
          label="Confirm"
          style={{ marginTop: scaleVer(12) }}
          onPress={onSeeDetail}
          disable={!checked}
        />
        <Button
          label="Back"
          colorStart={colors.errorLight}
          colorEnd={colors.error}
          onPress={onPressBack}
          style={{ marginTop: scaleVer(12) }}
        />
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: scaleHor(16),
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  widget: {
    ...textStyleObject.widgetItem,
  },
  text: {
    ...textStyleObject.bodyText,
    marginTop: scaleVer(12),
  },
});

export default SharingExplainModel;
