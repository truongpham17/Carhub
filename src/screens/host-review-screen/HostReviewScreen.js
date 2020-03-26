import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Alert,
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
import { NavigationType, UserType, CarType, HubType, CarModel } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import moment from 'moment';
import { addLease, setValue } from '@redux/actions/lease';
import firebase from 'react-native-firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

type PropTypes = {
  navigation: NavigationType,
  addLease: () => void,
  loading: Boolean,
  user: UserType,
  startDate: Date,
  endDate: Date,
  cardNumber: String,
  selectedHub: HubType,
  carModel: CarModel,
  InfoFromVin: [],
  vin: String,
  usingYears: Number,
  odometers: Number,
  images: [],
  setValue: () => void,
};

const HostReviewScreen = ({
  navigation,
  loading,
  addLease,
  user,
  startDate,
  endDate,
  cardNumber,
  selectedHub,
  carModel,
  InfoFromVin,
  vin,
  usingYears,
  odometers,
  images,
  setValue,
}: PropTypes) => {
  const [loadingRecognize, setLoading] = useState(false);
  const leaseContract = [
    {
      id: 'name',
      label: 'Car name',
      content: `${InfoFromVin[1].value} ${InfoFromVin[3].value} ${InfoFromVin[4].value}`,
    },
    {
      id: 'status',
      label: 'Car status',
      content: `${usingYears} years, ${odometers} kilometers`,
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
      label: `${
        carModel
          ? `${
              carModel.price
                ? 'You can earn up to'
                : 'You can make a lot of money'
            }`
          : 'You can make a lot of money'
      }`,
      content: `${
        carModel
          ? `${
              carModel.price
                ? `$${carModel.price *
                    parseInt(
                      (endDate.getTime() - startDate.getTime()) /
                        (1000 * 3600 * 24)
                    )}`
                : ''
            }`
          : ''
      }`,
    },
  ];
  const onPressBack = () => {
    navigation.pop();
  };
  const handleNextStep = async () => {
    setLoading(true);
    const imagesURL = [];
    await Promise.all(
      images
        .filter((_, i) => i > 0)
        .map(async element => {
          const id = uuidv4(element);
          const snapshot = await firebase
            .storage()
            .ref(`lease-car/${user._id}/${id}`)
            .putFile(element.uri);
          imagesURL.push(await snapshot.downloadURL);
        })
    );
    addLease(
      {
        odometer: odometers,
        images: imagesURL,
        startDate,
        endDate,
        usingYears,
        name: `${InfoFromVin[1].value} ${InfoFromVin[3].value} ${InfoFromVin[4].value}`,
        VIN: vin,
        customer: user._id,
        hub: selectedHub._id,
        cardNumber,
      },
      {
        onSuccess: () => {
          Alert.alert(
            'Successful',
            'You has been created lease request successfully',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('HostScreen'),
              },
            ],
            { cancelable: false }
          );
        },
        onFailure: () => {
          Alert.alert(
            'Something went wrong!',
            'Please make sure the your device connected to the internet',
            [{ text: 'OK', onPress: () => console.log('OK') }],
            { cancelable: false }
          );
        },
      }
    );
  };
  return (
    <ViewContainer
      scrollable
      haveBackHeader
      title="Host"
      onBackPress={onPressBack}
      loading={loading || loadingRecognize}
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
    user: state.user,
    startDate: state.lease.startDate,
    endDate: state.lease.endDate,
    cardNumber: state.lease.cardNumber,
    selectedHub: state.lease.selectedHub,
    carModel: state.lease.carModel,
    InfoFromVin: state.lease.InfoFromVin,
    vin: state.lease.vin,
    usingYears: state.lease.usingYears,
    odometers: state.lease.odometers,
    images: state.lease.images,
  }),
  { addLease, setValue }
)(HostReviewScreen);
