import React, { useState } from 'react';
import { Text, Alert } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ViewContainer, InputForm, Button, DatePicker } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { checkCarModelAvailable } from '@redux/actions/lease';
import moment from 'moment';

type PropTypes = () => {
  navigation: NavigationType,
  loading: Boolean,
  infoFromVin: [],
};

const HostHubScreen = ({ loading, navigation, infoFromVin }: PropTypes) => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(
    moment(today)
      .add(30, 'day')
      .toDate()
  );
  const [cardNumber, setCardNumber] = useState('');
  const [selectedHub, setSelectedHub] = useState('');

  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    if (!selectedHub) {
      Alert.alert('Please choose a hub');
    } else if (!cardNumber) {
      Alert.alert('Please input card number');
    } else if (startDate >= endDate) {
      Alert.alert('The selected date is wrong');
    } else {
      const name = `${infoFromVin[1].value} ${infoFromVin[3].value} ${infoFromVin[4].value}`;
      checkCarModelAvailable(dispatch)(
        { startDate, endDate, cardNumber, selectedHub, name },
        {
          onSuccess: () => navigation.navigate('HostReviewScreen'),
          onFailure: () => {
            console.log('error');
          },
        }
      );
    }
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

export default connect(state => ({
  loading: state.lease.loading,
  infoFromVin: state.lease.infoFromVin,
}))(HostHubScreen);
