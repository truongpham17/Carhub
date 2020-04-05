import React from 'react';
import { View, Text } from 'react-native';
import colors from 'Constants/colors';
import { scaleVer } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import { SuccessStick, ErrorCheck } from 'Assets/svgs';
import Button from './Button';

type PropTypes = {
  title: string,
  description: String,
  confirmLabel: String,
  onConfirm: () => void,
  popupType: 'success' | 'error',
};

const StatusDialog = ({
  title,
  description,
  confirmLabel = 'Ok',
  onConfirm,
  popupType,
}: PropTypes) => {
  const getIcon = () => {
    if (popupType === 'success') {
      return <SuccessStick />;
    }
    return <ErrorCheck />;
  };

  const getColors = () => {
    if (popupType === 'success') return '#77C73B';
    return colors.error;
  };
  return (
    <>
      <View style={{ position: 'absolute', top: -60 }}>{getIcon()}</View>
      <Text
        style={[
          textStyle.widgetTitle,
          { marginTop: scaleVer(48), textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      <View
        style={{ alignSelf: 'center', width: '80%', marginTop: scaleVer(12) }}
      >
        <Text style={[textStyle.bodyText, { textAlign: 'center' }]}>
          {description}
        </Text>
      </View>

      <Button
        label={confirmLabel}
        onPress={onConfirm}
        colorStart={getColors()}
        colorEnd={getColors()}
        style={{ borderRadius: 4, marginTop: scaleVer(24) }}
      />
    </>
  );
};

export default StatusDialog;
