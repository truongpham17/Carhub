import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, InputForm, DatePicker, Button } from 'Components';
import { NavigationType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { setRentalSearch } from '@redux/actions/car';
import moment from 'moment';
import { connect } from 'react-redux';

type PropTypes = {
  navigation: NavigationType,
  setRentalSearch: () => void,
};

const SearchCarScreen = ({ navigation, setRentalSearch }: PropTypes) => {
  const onBackPress = () => {};
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
        if (!endLocation) {
          setEndLocation(location);
        }
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

  const onSearchPress = () => {
    setRentalSearch({
      startLocation,
      endLocation,
      startDate,
      endDate,
    });
    navigation.navigate('SelectCarScreen');
  };
  return (
    <ViewContainer haveBackHeader title="Search Car" backAction={onBackPress}>
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
});
