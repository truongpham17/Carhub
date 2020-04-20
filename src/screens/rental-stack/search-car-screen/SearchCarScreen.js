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

  const onRequestPayment = () => {
    // if (!paymentToken) {
    //   getPaymentToken(dispatch)({
    //     onSuccess() {
    //       paypalService(paymentToken);
    //     },
    //   });
    // }
    paypalService(
      {
        token:
          'eyJ2ZXJzaW9uIjoyLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNklrRjFkR2g1SW4wLmV5SmxlSEFpT2pFMU9EY3dNamszTXpRc0ltcDBhU0k2SWpoaVpqSmtPRFZtTFROa1pHSXRORE0yTWkwNE5UQm1MV05rTkdKbU9EVTVPREZrWXlJc0luTjFZaUk2SW5kaWFETTVhek51TkRWa2VXYzVaMllpTENKcGMzTWlPaUpCZFhSb2VTSXNJbTFsY21Ob1lXNTBJanA3SW5CMVlteHBZMTlwWkNJNkluZGlhRE01YXpOdU5EVmtlV2M1WjJZaUxDSjJaWEpwWm5sZlkyRnlaRjlpZVY5a1pXWmhkV3gwSWpwbVlXeHpaWDBzSW5KcFoyaDBjeUk2V3lKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYjNCMGFXOXVjeUk2ZTMxOS4yZjN3NS1lME1ESkZrNHJqbV9ob3JRTFRZN1RKTjdmM1lraDlkWDM3bTJENGNwT2ozYUxfZ2E3dnljZFg5d0w0ZG1QMFdJeDdlZmx3YXYwajJpWmtIdyIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy93YmgzOWszbjQ1ZHlnOWdmL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImdyYXBoUUwiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2dyYXBocWwiLCJkYXRlIjoiMjAxOC0wNS0wOCJ9LCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3diaDM5azNuNDVkeWc5Z2YvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vd2JoMzlrM240NWR5ZzlnZiJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJraG9uZ2ZhcCIsImNsaWVudElkIjoiQVVXVGVEY1d5V0ZORFMtckluVnRHeUYxWEQxTWlxSGkzcTJyZUlfMHpkNWhsMW1RdGNmaWNNNC15OEt6Yl9saVg0QmxLa1lCWE95WGlscFUiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJraG9uZ2ZhcCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoid2JoMzlrM240NWR5ZzlnZiIsInZlbm1vIjoib2ZmIn0==',
        amount: 100,
      },
      {
        onSuccess(data) {
          const { nonce } = data;
        },
      }
    );
  };

  const onSearchPress = () => {
    setRentalSearch({
      // startLocation,
      // endLocation,
      startDate,
      endDate,
    });
    navigation.navigate('SelectCarScreen');
  };
  return (
    <ViewContainer
      title="Search Car"
      backAction={onBackPress}
      haveBackHeader
      haveBack={false}
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
        // onPress={onSearchPress}
        style={{ marginBottom: scaleVer(32) }}
        onPress={onRequestPayment}
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
