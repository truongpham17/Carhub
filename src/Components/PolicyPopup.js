import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { CheckBox } from 'react-native-elements';
import { textStyleObject, textStyle } from 'Constants/textStyles';
import Button from './Button';
import ModalContainer from './ModalContainer';

type PropTypes = {
  onClose: () => void,
  onConfirm: () => void,
  onDecline: () => void,
  title: String,
  description: { title: string, content: [String] },
};
const PolicyPopup = ({
  onConfirm,
  onDecline,
  title,
  description = { title: '', content: [] },
}: PropTypes) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Text style={styles.widget}>{title}</Text>
      <Text
        style={[
          textStyle.label,
          { marginTop: scaleVer(12), color: colors.error },
        ]}
      >
        {description.title}
      </Text>
      {description.content.map((item, index) => (
        <Text style={styles.text} key={index}>
          {' '}
          ᛫ {item}
        </Text>
      ))}

      <View
        style={{
          alignItems: 'flex-end',
          marginTop: scaleVer(12),
          marginStart: scaleHor(12),
        }}
      >
        <CheckBox
          title="I confirm that I've carefully read these information"
          checked={checked}
          onPress={() => setChecked(checked => !checked)}
          containerStyle={{ margin: 0 }}
          center={false}
        />
      </View>

      <Button
        label="Confirm"
        style={{ marginTop: scaleVer(12) }}
        onPress={onConfirm}
        disable={!checked}
      />
      <Button
        label="Back"
        colorStart={colors.errorLight}
        colorEnd={colors.error}
        onPress={() => {
          onDecline();
          setChecked(false);
        }}
        style={{ marginTop: scaleVer(12) }}
      />
    </>
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

export default PolicyPopup;
