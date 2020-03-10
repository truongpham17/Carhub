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
import { checkHostHubInfo } from '@redux/actions/hostHubInfo';

type PropTypes = () => {
  navigation: NavigationType,
  checkHostHubInfo: () => void,
  loading: Boolean,
};

const HostHubScreen = ({
  checkHostHubInfo,
  loading,
  navigation,
}: PropTypes) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [cardNumber, setCardNumber] = useState('');
  const [address, setAddress] = useState('');

  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    checkHostHubInfo(
      { startDate, endDate, cardNumber, address },
      {
        onSuccess: () => navigation.navigate('HostReviewScreen'),
        onFailure: () => {},
      }
    );
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
  const handleChangeAddress = address => {
    setAddress(address);
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
        value={address.address}
        onChangeText={handleChangeAddress}
        containerStyle={{ marginVertical: scaleVer(32) }}
        onTextFocus={() =>
          navigation.navigate('SelectMapScreen', {
            callback(location) {
              setAddress(location);
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
        Please fill in your Paypal information
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
    hub: state.leaseRequest.hub,
    loading: state.leaseRequest.loading,
  }),
  { checkHostHubInfo }
)(HostHubScreen);
