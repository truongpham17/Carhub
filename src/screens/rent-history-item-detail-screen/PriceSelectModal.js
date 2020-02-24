import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ModalContainer, Button } from 'Components';
import { Slider } from 'react-native-elements';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';

type PropType = {
  visible: Boolean,
  onClose: () => void,
  onSubmit: () => void,
};

const PriceSelectModal = ({ visible, onClose, onSubmit }: PropType) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    handleValueChange(100);
  }, []);

  const handleValueChange = val => {
    setValue(val);
  };

  const onUserSubmit = () => {
    onSubmit(value);
  };

  return (
    <ModalContainer modalVisible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.itemContainer}>
          <Text style={[textStyle.widgetItem, { marginBottom: scaleVer(16) }]}>
            Select price for sharing
          </Text>
        </View>
        <View style={[styles.itemContainer, styles.priceContainer]}>
          <Text style={textStyle.bodyTextBold}>Sharing price</Text>
          <Text style={textStyle.bodyTextBold}>{value}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Slider
            value={value}
            onValueChange={handleValueChange}
            minimumValue={50}
            maximumValue={200}
            step={1}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.secondary}
            maximumTrackTintColor={colors.white}
            trackStyle={{
              borderWidth: 1,
              borderColor: '#9A9FA3',
              borderRadius: 3,
              height: scaleVer(6),
            }}
          />
        </View>
        <View style={styles.itemContainer}>
          <Button label="SHARE" onPress={onUserSubmit} />
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    paddingVertical: scaleVer(16),
    paddingHorizontal: scaleHor(16),
    height: scaleVer(256),
    width: scaleHor(256),
  },
  itemContainer: {
    flex: 1,
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default PriceSelectModal;
