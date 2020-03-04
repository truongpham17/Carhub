import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, Button, DatePicker } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';

type PropTypes = () => {
  navigation: NavigationType,
};

const HostHubScreen = ({ navigation }: PropTypes) => {
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    navigation.navigate('HostReviewScreen');
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleChangeDate = (type, date) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
    >
      <InputForm
        label="Select hub address"
        placeholder="Enter location..."
        containerStyle={{ marginVertical: scaleVer(32) }}
      />
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeDate={handleChangeDate}
      />
      <Text style={[textStyle.label, { marginTop: scaleVer(32) }]}>
        Please fill in your Paypal information
      </Text>
      <InputForm
        label="CARD NUMBER"
        containerStyle={{ marginVertical: scaleVer(32) }}
      />
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Next step"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default HostHubScreen;
