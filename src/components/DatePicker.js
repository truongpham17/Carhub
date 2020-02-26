import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar, RightArrow } from 'assets/svgs';
import moment from 'moment';

type ItemTypes = {
  date: Date,
  type: 'start' | 'end',
  onItemPress: string => void,
};

type PropTypes = {
  startDate: Date,
  endDate: Date,
  onChangeDate: string => void,
};
const Item = ({ date, type, onItemPress }: ItemTypes) => {
  const a = 12;
  const momentTime = moment(date.getTime());
  return (
    <TouchableOpacity onPress={() => onItemPress(type)}>
      <Text>From</Text>
      <Text>{momentTime.format('Do MMM')}</Text>
      <Text>{momentTime.format('dddd')}</Text>
    </TouchableOpacity>
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
    <View>
      <Text>Select date</Text>
      <View>
        <Calendar />
        <Item type="start" date={startDate} onItemPress={onItemPress} />
        <RightArrow />
        <Item type="end" date={endDate} onItemPress={onItemPress} />
      </View>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        onConfirm={handleConfirmDatePicker}
        date={new Date()}
        onCancel={onClosePicker}
      />
    </View>
  );
};
export default DatePicker;
