import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, ProgressStep, ListItem, Button } from 'Components';

import { connect, useSelector, useDispatch } from 'react-redux';
import { addPayment } from '@redux/actions/payment';
import { addRentRequest } from '@redux/actions/car';
import { NavigationType, CarModel, HubType, UserType } from 'types';
import moment from 'moment';
import { scaleVer } from 'Constants/dimensions';
import { paypalService } from 'services/paypal';
import { setPopUpData, cancelPopup } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
  car: { carModel: CarModel, hub: HubType },
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
  const dispatch = useDispatch();
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);
  const duration = momentToDate.diff(momentFromDate, 'days');
  const paymentToken = useSelector(state => state.payment.paymentToken);

  const data = [
    { label: 'Car name', value: car.carModel.name },
    { label: 'From date', value: momentFromDate.format('DD MMM YYYY') },
    { label: 'To date', value: momentToDate.format('DD MMM YYYY') },
    {
      label: 'Duration',
      value: `${duration} days`,
    },
    { label: 'Price per day', value: car.carModel.price },
    { label: 'Extra price', value: `0 $` },
    { label: 'Total', value: `${duration * car.carModel.price}$` },
    { label: 'Pick-up hub location', value: car.hub.address },
    { label: 'Pick-off hub location', value: pickOffHub.address },
  ];
  const onBackPress = () => {
    navigation.pop();
  };

  const handlePayment = () => {
    paypalService(
      {
        token: paymentToken,
        amount: Math.round(duration * car.carModel.price * 0.3),
      },
      {
        onSuccess(data) {
          const { nonce } = data;
          onSubmit(nonce);
        },
      }
    );
  };

  const onSubmit = nonce => {
    addRentRequest(
      {
        carModel: car.carModel._id,
        customer: user._id,
        type: 'hub',
        startDate: fromDate.toISOString(),
        endDate: toDate.toISOString(),
        pickupHub: car.hub._id,
        pickoffHub: pickOffHub._id,
        price: car.carModel.price,
        totalCost: duration * car.carModel.price,
        description: 'Rental booking',
        payment: payment._id,
        nonce,
      },
      {
        onSuccess() {
          navigation.navigate('SuccessBookingRental');
        },
        onFailure() {},
      }
    );
  };

  const showPopup = () => {
    setPopUpData(dispatch)({
      title: 'Pay fee in advance',
      description:
        'To prevent spamming, customer need to pay deposit with 30% of total renting fee. Press OK to continue',
      onConfirm() {
        cancelPopup(dispatch);
        handlePayment();
      },
    });
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
        label="Payment"
        style={{ marginVertical: scaleVer(16) }}
        onPress={showPopup}
      />
    </ViewContainer>
  );
};

export default connect(
  state => ({
    car: state.car.carModels.find(
      item => item.carModel._id === state.car.selectedCar
    ),
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
