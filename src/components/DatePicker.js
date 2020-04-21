import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar, RightArrow } from 'Assets/svgs';
import moment from 'moment';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';

type ItemTypes = {
  date: Date,
  type: 'start' | 'end',
  onItemPress: string => void,
};

type PropTypes = {
  startDate: Date,
  endDate: Date,
  onChangeDate: string => void,
  date: Date,
};
const Item = ({ date, type, onItemPress }: ItemTypes) => {
  const momentTime = moment(date);
  return (
    <View style={styles.itemContainer}>
      <Calendar />
      <TouchableOpacity onPress={() => onItemPress(type)} style={styles.button}>
        <Text style={textStyle.bodyText}>
          {type === 'start' ? 'From' : 'To'}
        </Text>
        <Text style={textStyle.bodyTextBold}>
          {momentTime.format('Do MMM')}
        </Text>
        <Text style={textStyle.bodyText}>{momentTime.format('dddd')}</Text>
      </TouchableOpacity>
    </View>
  );
};
const DatePicker = ({ startDate, endDate, onChangeDate }: PropTypes) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [type, setType] = useState('');
  const onClosePicker = () => {
    setPickerVisible(false);
  };

  const onItemPress = type => {
    setPickerVisible(true);
    setType(type);
  };

  const handleConfirmDatePicker = date => {
    onClosePicker();
    onChangeDate(type, date);
  };

  return (
    <View style={styles.container}>
      <Text style={textStyle.widgetItem}>Select date</Text>
      <View style={styles.content}>
        <Item type="start" date={startDate} onItemPress={onItemPress} />
        <RightArrow />
        <Item type="end" date={endDate} onItemPress={onItemPress} />
      </View>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        onConfirm={handleConfirmDatePicker}
        date={type === 'start' ? startDate : endDate}
        onCancel={onClosePicker}
      />
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleHor(16),
    paddingVertical: scaleVer(16),
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_3,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleVer(8),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleHor(8),
  },
  button: {
    marginStart: scaleHor(16),
  },
});
