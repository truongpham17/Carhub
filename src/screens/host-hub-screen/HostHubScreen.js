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
import { NavigationType, CarType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { checkHostHubInfo } from '@redux/actions/lease';

type PropTypes = () => {
  navigation: NavigationType,
  checkHostHubInfo: () => void,
  loading: Boolean,
  car: CarType,
};

const HostHubScreen = ({
  checkHostHubInfo,
  loading,
  navigation,
  car,
}: PropTypes) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('');
  const [selectedHub, setSelectedHub] = useState('');

  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    const name = `${car.valueData[1].value} ${car.valueData[3].value} ${car.valueData[4].value}`;
    checkHostHubInfo({ startDate, endDate, cardNumber, selectedHub, name });
    navigation.navigate('HostReviewScreen');
  };
  const handleChangeDate = (type, date) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  const handleChangeCardNumber = cardNumber => {
    setCardNumber(cardNumber);
  };
  const handleChangeAddress = selectedHub => {
    setSelectedHub(selectedHub);
  };

  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading}
    >
      <InputForm
        label="Select hub address"
        placeholder="Enter location..."
        value={selectedHub.address}
        onChangeText={handleChangeAddress}
        containerStyle={{ marginVertical: scaleVer(32) }}
        onTextFocus={() =>
          navigation.navigate('SelectMapScreen', {
            callback(hub) {
              setSelectedHub(hub);
              navigation.pop(1);
            },
            type: 'hub',
          })
        }
      />
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeDate={handleChangeDate}
      />
      <Text style={[textStyle.label, { marginTop: scaleVer(32) }]}>
        Select your card number
      </Text>
      <InputForm
        label="CARD NUMBER"
        value={cardNumber}
        onChangeText={handleChangeCardNumber}
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

export default connect(
  state => ({
    loading: state.lease.loading,
    car: state.lease.car,
  }),
  { checkHostHubInfo }
)(HostHubScreen);
