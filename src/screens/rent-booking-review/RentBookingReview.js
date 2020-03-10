import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, ProgressStep, ListItem, Button } from 'Components';

import { connect } from 'react-redux';

import { NavigationType, CarType, HubType } from 'types';
import moment from 'moment';

type PropTypes = {
  navigation: NavigationType,
  car: CarType,
  fromDate: Date,
  toDate: Date,
  pickOffHub: HubType,
};

const RentBookingDetail = ({
  navigation,
  car,
  fromDate,
  toDate,
  pickOffHub,
}: PropTypes) => {
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);
  const duration = momentToDate.diff(momentToDate, 'days');
  const data = [
    { label: 'Car name', value: car.carModel.name },
    { label: 'From date', value: momentFromDate.format('DD MMM YYYY') },
    { label: 'To date', value: momentToDate.format('DD MMM YYYY') },
    {
      label: 'Duration',
      value: `${duration} days`,
    },
    { label: 'Price per day', value: car.price },
    { label: 'Extra price', value: `0 $` },
    { label: 'Total', value: `${duration * car.price}$` },
    { label: 'Pick-up hub location', value: car.hub.address },
    { label: 'Pick-off hub location', value: pickOffHub.address },
  ];
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer haveBackHeader title="Search Car" onBackPress={onBackPress}>
      <ProgressStep labels={['Review', 'Payment', 'Complete']} />
      <View style={{ flex: 1 }}>
        {data.map((item, index) => (
          <ListItem
            label={item.label}
            type="detail"
            showSeparator={index !== data.length - 1}
            detail={item.value}
            key={index}
            pressable={false}
          />
        ))}
      </View>
      <Button label="Next" />
    </ViewContainer>
  );
};

export default connect(
  state => ({
    car: state.car.selectedCar,
    fromDate: state.car.rentalSearch.fromDate,
    toDate: state.car.rentalSearch.toDate,
    pickOffHub: state.car.pickOffHub,
  }),
  {}
)(RentBookingDetail);
const styles = StyleSheet.create({});
