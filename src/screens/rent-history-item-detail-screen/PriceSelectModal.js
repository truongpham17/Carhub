import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ModalContainer, Button, DatePicker } from 'Components';
import { Slider } from 'react-native-elements';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';
import dimensions, { scaleVer, scaleHor } from 'Constants/dimensions';
import Separator from 'Components/Separator';

type PropType = {
  visible: Boolean,
  onClose: () => void,
  onSubmit: () => void,
  suggestCost: Number,
  maximumCost: Number,
  minimumCost: Number,
  endDate: Date,
};

const PriceSelectModal = ({
  visible,
  onClose,
  onSubmit,
  suggestCost,
  maximumCost,
  minimumCost = 50,
  endDate,
}: PropType) => {
  const [value, setValue] = useState(suggestCost);
  const [fromDate, setFromDate] = useState(Date.now());
  const [toDate, setToDate] = useState(endDate);

  // useEffect(() => {
  //   handleValueChange(suggestCost);
  // }, []);

  const handleValueChange = val => {
    setValue(val);
  };

  const onUserSubmit = () => {
    onSubmit({
      price: value,
      fromDate,
      toDate,
    });
  };

  const handleChangeDate = (type, date) => {
    if (type === 'start') {
      setFromDate(date);
    } else {
      setToDate(date);
    }
  };

  return (
    <ModalContainer modalVisible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <Text style={[textStyle.widgetItem, { alignSelf: 'center' }]}>
            Sharing Options
          </Text>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={[{ flex: 1 }, styles.priceContainer]}>
            <Text style={textStyle.bodyTextBold}>Sharing price</Text>
            <Text style={textStyle.bodyTextBold}>{value}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Slider
              value={value}
              onValueChange={handleValueChange}
              minimumValue={minimumCost}
              maximumValue={maximumCost * 0.8}
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
            <Separator />
          </View>
        </View>
        <View style={[styles.itemContainer, { marginVertical: scaleVer(20) }]}>
          <Text
            style={[textStyle.bodyTextBold, { marginVertical: scaleVer(16) }]}
          >
            Sharing price
          </Text>
          <DatePicker
            startDate={fromDate}
            endDate={toDate}
            onChangeDate={handleChangeDate}
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
    paddingVertical: scaleVer(10),
    paddingHorizontal: scaleHor(16),
    height: scaleVer(420),
    width: dimensions.SCREEN_WIDTH * 0.9,
    borderRadius: 15,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {},
});

export default PriceSelectModal;
