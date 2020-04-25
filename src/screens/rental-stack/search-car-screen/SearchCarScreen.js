import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ViewContainer, InputForm, DatePicker, Button } from 'Components';
import { NavigationType } from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { setRentalSearch } from '@redux/actions/car';
import moment from 'moment';
import { connect, useDispatch, useSelector } from 'react-redux';
import { textStyle } from 'Constants/textStyles';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import firebase from 'react-native-firebase';
import { updateUser } from '@redux/actions/user';
import { getPaymentToken } from '@redux/actions';
import { paypalService } from 'services/paypal';
import Seperator from './Seperator';

type PropTypes = {
  navigation: NavigationType,
  setRentalSearch: () => void,
};

const SearchCarScreen = ({ navigation, setRentalSearch }: PropTypes) => {
  const onBackPress = () => {};
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const paymentToken = useSelector(state => state.payment.paymentToken);

  useEffect(() => {
    firebase
      .messaging()
      .getToken()
      .then(token => {
        if (token) {
          console.log(token);
          if (token !== user.fcmToken) {
            updateUser(dispatch)({ id: user._id, fcmToken: token });
          }
        }
      });
    if (!paymentToken) {
      getPaymentToken(dispatch)();
    }
  }, []);

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [endDate, setEndDate] = useState(
    moment(today)
      .add(3, 'day')
      .toDate()
  );
  const handleChangeDate = (type, date) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  const onSelectStartLocation = () => {
    navigation.navigate('SelectLocationScreen', {
      callback(location) {
        setStartLocation(location);
        // if (!endLocation) {
        //   setEndLocation(location);
        // }
      },
    });
  };

  const onSelectEndLocation = () => {
    navigation.navigate('SelectLocationScreen', {
      callback(location) {
        setEndLocation(location);
      },
    });
  };

  const onRequestPayment = () => {};

  const onSearchPress = () => {
    setRentalSearch({
      startLocation,
      endLocation,
      startDate,
      endDate,
    });
    setStartLocation(null);
    setEndLocation(null);
    navigation.navigate('SelectCarScreen');
  };
  return (
    <ViewContainer
      title="Search Car"
      backAction={onBackPress}
      haveBackHeader
      onBackPress={() => navigation.pop()}
    >
      <View style={{ flex: 1 }}>
        <InputForm
          label="Pick up location"
          placeholder="Enter location"
          containerStyle={styles.input}
          onTextFocus={onSelectStartLocation}
          value={startLocation ? startLocation.address : ''}
        />
        <InputForm
          label="Pick off location"
          placeholder="Enter location"
          containerStyle={styles.input}
          onTextFocus={onSelectEndLocation}
          value={endLocation ? endLocation.address : ''}
        />
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onChangeDate={handleChangeDate}
        />
      </View>

      <Button
        label="Search"
        onPress={onSearchPress}
        style={{ marginBottom: scaleVer(32) }}
        // disable={!(startLocation && endLocation)}
      />
    </ViewContainer>
  );
};

export default connect(state => ({}), { setRentalSearch })(SearchCarScreen);

const styles = StyleSheet.create({
  input: {
    marginBottom: scaleVer(32),
  },
  button: {
    height: scaleHor(64),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowStyle.ELEVATION_3,
    backgroundColor: colors.white,
    marginVertical: scaleVer(16),
  },
});
