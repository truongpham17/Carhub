import React, { useState } from 'react';
import { Text, Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ViewContainer, InputForm, Button, DatePicker } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType, UserType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { checkCarModelAvailable } from '@redux/actions/lease';
import moment from 'moment';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';

type PropTypes = () => {
  navigation: NavigationType,
  loading: Boolean,
  infoFromVin: [],
};

const HostHubScreen = ({ loading, navigation, infoFromVin }: PropTypes) => {
  const dispatch = useDispatch();
  const user: UserType = useSelector(state => state.user);
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(
    moment(today)
      .add(30, 'day')
      .toDate()
  );
  const [cardNumber, setCardNumber] = useState({});
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
        { startDate, endDate, cardNumber: cardNumber.email, selectedHub, name },
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
        Select your Paypal account
      </Text>
      {(user.paypalCard || []).map(item => (
        <CardItem
          data={item}
          onSelectItem={value => setCardNumber(value)}
          selectedId={cardNumber._id}
        />
      ))}
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Next step"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

type CardData = {
  email: String,
  _id: String,
};
type CardItemTypes = {
  data: CardData,
  onSelectItem: (_id: String) => void,
  selectedId: String,
};

const CardItem = ({ data, onSelectItem, selectedId }: CardItemTypes) => (
  <TouchableOpacity
    style={[styles.cardItem, data._id === selectedId ? styles.activeItem : {}]}
    onPress={() => onSelectItem(data)}
  >
    <Text style={textStyle.bodyText}>{data.email}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardItem: {
    alignSelf: 'stretch',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadowStyle.ELEVATION_2,
    backgroundColor: colors.white,
    marginTop: scaleVer(8),
    paddingHorizontal: scaleHor(8),
    borderRadius: 4,
  },
  activeItem: {
    borderWidth: 1,
    borderColor: colors.success,
  },
});

export default connect(state => ({
  loading: state.lease.loading,
  infoFromVin: state.lease.infoFromVin,
}))(HostHubScreen);
