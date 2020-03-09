import React, { useState } from 'react';
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
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import moment from 'moment';
import { addLease } from '@redux/actions/hostReview';

const showProperties = ['vin', 'odometers', 'usingYears'];

type CarTypes = {
  vin: String,
  usingYears: String,
  odometers: String,
  name: String,
  images: [],
};

type HubTypes = {
  startDate: Date,
  endDate: Date,
  cardNumber: String,
  address: String,
};

type PropTypes = {
  navigation: NavigationType,
  addLease: () => void,
  loading: Boolean,
  car: CarTypes,
  hub: HubTypes,
};

const HostReviewScreen = ({
  navigation,
  loading,
  car,
  hub,
  addLease,
}: PropTypes) => {
  const review = [
    {
      id: 'name',
      label: 'Car name',
      content: car.name,
    },
    {
      id: 'status',
      label: 'Car status',
      content: `${car.usingYears} years, ${car.odometers} kilometers`,
    },
    {
      id: 'from',
      label: 'From date',
      content: moment(hub.startDate).format('DD-MM-YYYY'),
    },
    {
      id: 'to',
      label: 'To date',
      content: moment(hub.endDate).format('DD-MM-YYYY'),
    },
    {
      id: 'duration',
      label: 'Duration',
      content: hub.endDate.getTime() - hub.startDate.getTime(),
    },
    {
      id: 'customer',
      label: 'Customer name',
      content: 'Cuong Thai',
    },
    {
      id: 'phone',
      label: 'Phone',
      content: '0909498577',
    },
    {
      id: 'location',
      label: 'Hub location',
      content: hub.address,
    },
    {
      id: 'cost',
      label: 'Cost',
      content: '$2020',
    },
    {
      id: 'number',
      label: 'Card number',
      content: hub.cardNumber,
    },
  ];
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = () => {
    addLease(
      {
        odometers: car.odometers,
        images: car.images,
        startDate: hub.startDate,
        endDate: hub.endDate,
      },
      {
        onSuccess: () => navigation.navigate('HostScreen'),

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
      {review.map((item, index) => (
        <ListItem
          type="detail"
          label={item.label}
          detail={item.content}
          showSeparator={index !== review.length - 1}
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
    loading: state.leaseRequest.loading,
    car: state.leaseRequest.car,
    hub: state.leaseRequest.hub,
  }),
  { addLease }
)(HostReviewScreen);
