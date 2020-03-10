import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';

import { connect } from 'react-redux';

import { NavigationType } from 'types';
import { textStyle } from 'Constants/textStyles';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import moment from 'moment';
import Seperator from './Seperator';

type PropTypes = {
  navigation: NavigationType,
};

const data = [
  { key: 'firstName', label: 'First Name' },

  { key: 'middleName', label: 'Middle Name' },
  { key: 'lastName', label: 'Last Name' },
  {
    key: 'country',
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
  { key: 'licenseNumber', label: 'License Number' },
  { key: 'date', label: 'Created Date', type: 'calendar' },
];

const LicenseScreen = ({ navigation }: PropTypes) => {
  const [license, setLicense] = useState({
    firstName: null,
    middleName: null,
    country: null,
    licenseNumber: null,
    date: null,
  });
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

  const onSubmitLicense = () => {};

  return (
    <ViewContainer
      haveBackHeader
      title="Driver's License"
      onBackPress={onBackPress}
      scrollable
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

export default connect(state => ({}), {})(LicenseScreen);
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
