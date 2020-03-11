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
import { NavigationType, UserType, CarType, HubType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import moment from 'moment';
import { addLease } from '@redux/actions/hostReview';
import firebase from 'react-native-firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const showProperties = ['vin', 'odometers', 'usingYears'];

type PropTypes = {
  navigation: NavigationType,
  addLease: () => void,
  loading: Boolean,
  car: CarType,
  hub: HubType,
  user: UserType,
};

const HostReviewScreen = ({
  navigation,
  loading,
  car,
  hub,
  addLease,
  user,
}: PropTypes) => {
  const review = [
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
      content: `${parseInt(
        (hub.endDate.getTime() - hub.startDate.getTime()) / (1000 * 3600 * 24)
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
      content: '0909498577',
    },
    {
      id: 'location',
      label: 'Hub location',
      content: hub.address.address,
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
  const handleNextStep = async () => {
    console.log('Start');
    const upload = await car.images.forEach(element => {
      const id = uuidv4(element);
      firebase
        .storage()
        .ref(`lease-car/${user._id}/${id}`)
        .putFile(element);
      // .on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
      //   if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
      //     console.log(snapshot.downloadURL);
      //   }
      // });
    });
    console.log('End');

    // addLease(
    //   {
    //     odometer: car.odometers,
    //     images: snapshot.downloadURL,
    //     startDate: hub.startDate,
    //     endDate: hub.endDate,
    //     name: `${car.valueData[1].value} ${car.valueData[3].value} ${car.valueData[4].value}`,
    //     VIN: car.vin,
    //     customer: user._id,
    //     hub: hub._id,
    //   },
    //   {
    //     onSuccess: () => navigation.navigate('HostScreen'),
    //     onFailure: () => {},
    //   }
    // );
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
    user: state.user,
  }),
  { addLease }
)(HostReviewScreen);
