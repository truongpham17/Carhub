import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ViewContainer,
  InputForm,
  Button,
  DatePicker,
  ListItem,
} from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType, UserType, CarType, HubType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import moment from 'moment';
import { addLease } from '@redux/actions/lease';
import 'react-native-get-random-values';
import firebase from 'react-native-firebase';
import { v4 as uuidv4 } from 'uuid';

const showProperties = ['vin', 'odometers', 'usingYears'];

type PropTypes = {
  navigation: NavigationType,
  addLease: () => void,
  loading: Boolean,
  car: CarType,
  user: UserType,
  startDate: Date,
  endDate: Date,
  cardNumber: String,
  selectedHub: HubType,
};

const HostReviewScreen = ({
  navigation,
  loading,
  car,
  addLease,
  user,
  startDate,
  endDate,
  cardNumber,
  selectedHub,
}: PropTypes) => {
  const leaseContract = [
    {
      id: 'name',
      label: 'Car name',
      content: `${car.valueData[1].value} ${car.valueData[3].value} ${car.valueData[4].value}`,
    },
    {
      id: 'status',
      label: 'Car status',
      content: `${car.usingYears} years, ${car.odometers} kilometers`,
    },
    {
      id: 'from',
      label: 'From date',
      content: moment(startDate).format('DD-MM-YYYY'),
    },
    {
      id: 'to',
      label: 'To date',
      content: moment(endDate).format('DD-MM-YYYY'),
    },
    {
      id: 'duration',
      label: 'Duration',
      content: `${parseInt(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      )} days`,
    },
    {
      id: 'customer',
      label: 'Customer name',
      content: user.username,
    },
    {
      id: 'phone',
      label: 'Phone',
      content: user.phone,
    },
    {
      id: 'location',
      label: 'Hub location',
      content: selectedHub.address,
    },
    {
      id: 'number',
      label: 'Card number',
      content: cardNumber,
    },
    {
      id: 'revenue',
      label: 'You can earn up to',
      content: '$2020',
    },
  ];
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = async () => {
    const images = [];
    await Promise.all(
      car.images.map(async element => {
        const id = uuidv4(element);
        const snapshot = await firebase
          .storage()
          .ref(`lease-car/${user._id}/${id}`)
          .putFile(element);
        images.push(await snapshot.downloadURL);
      })
    );
    addLease(
      {
        odometer: car.odometers,
        images,
        startDate,
        endDate,
        usingYears: car.usingYears,
        name: `${car.valueData[1].value} ${car.valueData[3].value} ${car.valueData[4].value}`,
        VIN: car.vin,
        customer: user._id,
        hub: selectedHub._id,
        cardNumber,
      },
      {
        onSuccess: () => {
          navigation.navigate('HostScreen');
        },
        onFailure: () => {},
      }
    );
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading}
    >
      {leaseContract.map((item, index) => (
        <ListItem
          type="detail"
          label={item.label}
          detail={item.content}
          showSeparator={index !== leaseContract.length - 1}
          key={item.label}
          pressable={false}
        />
      ))}
      <Button
        style={{ marginVertical: scaleVer(32) }}
        label="Submit"
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default connect(
  state => ({
    loading: state.lease.loading,
    car: state.lease.car,
    user: state.user,
    startDate: state.lease.startDate,
    endDate: state.lease.endDate,
    cardNumber: state.lease.cardNumber,
    selectedHub: state.lease.selectedHub,
  }),
  { addLease }
)(HostReviewScreen);
