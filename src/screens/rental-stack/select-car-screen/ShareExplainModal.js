import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ModalContainer, Button } from 'Components';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { textStyle, textStyleObject } from 'Constants/textStyles';

type PropTypes = {
  visible: Boolean,
  onClose: () => void,
  onSeeDetail: () => void,
};
const SharingExplainModel = ({ visible, onClose, onSeeDetail }: PropTypes) => (
  <ModalContainer modalVisible={visible} onClose={onClose}>
    <View style={styles.container}>
      <Text style={styles.widget}>Hire a sharing car</Text>
      <Text style={styles.text}>
        This car has been hired by someone, now he/she want to transfer this car
        with a lower price.
      </Text>
      <Text style={styles.text}>
        This sharing car has been shown to you because of the matching of your
        search data.
      </Text>
      <Text style={styles.text}>
        To hire this car, you need to accept some policies and responsibilities.
        To see more requirements, click to this car.
      </Text>
      <Button
        label="See detail"
        style={{ marginTop: scaleVer(12) }}
        onPress={onSeeDetail}
      />
    </View>
  </ModalContainer>
);

const styles = StyleSheet.create({
  container: {
    width: '80%',
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
