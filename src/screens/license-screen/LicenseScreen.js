import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';

import { connect } from 'react-redux';

import { NavigationType } from 'types';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { addLicense } from '@redux/actions/user';
import moment from 'moment';
import Seperator from './Seperator';

type PropTypes = {
  navigation: NavigationType,
  addLicense: () => void,
  loading: boolean,
};

const data = [
  { key: 'fullname', label: 'Full Name' },
  {
    key: 'nationality',
    label: 'Country',
    type: 'dropdown',
    dropDownList: [
      {
        value: 'Viet Nam',
        key: 'vietnam',
      },
      {
        value: 'America',
        key: 'america',
      },
      {
        value: 'Viet Nam',
        key: 'vietnam1',
      },
      {
        value: 'America',
        key: 'america1',
      },
      {
        value: 'Viet Nam',
        key: 'vietnam2',
      },
      {
        value: 'America',
        key: 'america2',
      },
    ],
  },
  { key: 'number', label: 'License Number' },
  { key: 'expires', label: 'Expired Date', type: 'calendar' },
  { key: 'address', label: 'Address' },
  { key: 'dateOfBirth', label: 'Date of birth', type: 'calendar' },
];

const LicenseScreen = ({ navigation, addLicense, loading }: PropTypes) => {
  const [license, setLicense] = useState({});
  const onBackPress = () => {
    navigation.pop();
  };

  const getItemData = item => {
    if (!license[item.key]) return '';
    switch (item.type) {
      case 'calendar': {
        return moment(license[item.key]).format('DD MMM YYYY');
      }
      case 'dropdown': {
        return license[item.key].value;
      }
      default:
        return license[item.key];
    }
  };

  const validateData = () => {
    const nullData = data.find(item => !license[item.key]);
    return !nullData;
  };

  const onSubmitLicense = () => {
    const data = {
      fullname: license.fullname,
      nationality: license.nationality.value,
      number: license.number,
      expires: license.expires.toISOString(),
      address: license.address,
      dateOfBirth: license.dateOfBirth.toISOString(),
    };
    console.log(data);
    addLicense(data, {
      onSuccess() {
        navigation.pop(2);
      },
      onFailure() {
        console.log('ERROR!');
      },
    });
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Driver's License"
      onBackPress={onBackPress}
      scrollable
      loading={loading}
    >
      <Text
        style={[
          textStyle.bodyText,
          { textAlign: 'center', marginVertical: scaleVer(16) },
        ]}
      >
        Enter your info exactly as it appears on your license so “App Name” can
        verify your eligibility to drive
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={textStyle.bodyText}>Scan license to autofill</Text>
      </TouchableOpacity>
      <Seperator />

      {data.map(item => (
        <InputForm
          {...item}
          value={getItemData(item)}
          onChangeText={text =>
            setLicense(license => ({ ...license, [item.key]: text }))
          }
          containerStyle={{ marginBottom: scaleVer(16) }}
        />
      ))}

      <Button
        label="Continue"
        onPress={onSubmitLicense}
        disable={!validateData()}
        style={{ marginBottom: scaleVer(16) }}
      />
    </ViewContainer>
  );
};

export default connect(state => ({ loading: state.user.loadingLicense }), {
  addLicense,
})(LicenseScreen);
const styles = StyleSheet.create({
  button: {
    height: scaleHor(48),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_3,
    borderRadius: 4,
  },
});
