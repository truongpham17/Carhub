import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, ProgressStep, ListItem, Button } from 'Components';

import { connect } from 'react-redux';
import { addPayment } from '@redux/actions/payment';
import { addRentRequest } from '@redux/actions/car';
import { NavigationType, CarType, HubType, UserType } from 'types';
import moment from 'moment';
import { scaleVer } from 'Constants/dimensions';

type PropTypes = {
  navigation: NavigationType,
  car: CarType,
  fromDate: Date,
  toDate: Date,
  pickOffHub: HubType,
  user: UserType,
  addPayment: () => void,
  loading: Boolean,
  loadingRental: Boolean,
  payment: { _id: string },
  addRentRequest: () => void,
};

const RentBookingReview = ({
  navigation,
  car,
  fromDate,
  toDate,
  pickOffHub,
  user,
  addPayment,
  loading,
  loadingRental,
  payment,
  addRentRequest,
}: PropTypes) => {
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);
  const duration = momentToDate.diff(momentFromDate, 'days');
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

  const handleNextStep = () => {
    if (!user.license) {
      navigation.navigate('InfoExplainScreen');
    } else {
      addPayment(
        {
          type: 'Rental',
          amount: duration * car.price,
          note: 'Rental transaction',
        },
        {
          onSuccess() {
            console.log('come here!!!!');
            // navigation.navigate('SuccessBookingRental');
            addRentRequest(
              {
                car: car._id,
                customer: user._id,
                type: 'hub',
                startDate: fromDate.toISOString(),
                endDate: toDate.toISOString(),
                pickupHub: car.currentHub._id,
                pickoffHub: pickOffHub._id,
                price: car.price,
                totalCost: duration * car.price,
                description: 'Rental booking',
                payment: payment._id,
              },
              {
                onSuccess() {
                  navigation.navigate('SuccessBookingRental');
                },
                onFailure() {},
              }
            );
          },
          onFailure() {},
        }
      );
    }
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Booking"
      onBackPress={onBackPress}
      scrollable
      loading={loading || loadingRental}
    >
      <ProgressStep
        labels={['Review', 'Payment', 'Complete']}
        currentStep={0}
        style={{ marginBottom: scaleVer(16) }}
      />
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
      <Button
        label="Next"
        style={{ marginVertical: scaleVer(16) }}
        onPress={handleNextStep}
      />
    </ViewContainer>
  );
};

export default connect(
  state => ({
    car: state.car.data.find(item => item._id === state.car.selectedCar),
    fromDate: state.car.rentalSearch.startDate,
    toDate: state.car.rentalSearch.endDate,
    pickOffHub: state.car.pickOffHub,
    user: state.user,
    loading: state.payment.loading,
    loadingRental: state.car.loading,
    payment: state.payment,
  }),
  { addPayment, addRentRequest }
)(RentBookingReview);
const styles = StyleSheet.create({});
