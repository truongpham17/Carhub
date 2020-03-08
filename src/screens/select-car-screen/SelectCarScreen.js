import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ViewContainer, Button } from 'Components';
import { CarType, NavigationType } from 'types';

import { getCarList } from '@redux/actions/car';

import { textStyle } from 'Constants/textStyles';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import { connect } from 'react-redux';
import SelectCarItem from './SelectCarItem';
import Header from './Header';

type PropTypes = {
  navigation: NavigationType,
  geometry: {
    lat: Number,
    lng: Number,
  },
  carList: [CarType],
  getCarList: () => void,
};

const data = [
  {
    image:
      'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    name: 'Turbo X 2010',
    type: 'Exclusive',
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: '5 Passengers',
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Provide hub',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: '6 Bags',
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: '50$/day',
      },
    ],
  },
  {
    image:
      'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    name: 'Turbo X 2010',
    type: 'Exclusive',
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: '5 Passengers',
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Provide hub',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: '6 Bags',
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: '50$/day',
      },
    ],
  },
  {
    image:
      'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    name: 'Turbo X 2010',
    type: 'Exclusive',
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: '5 Passengers',
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Provide hub',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: '6 Bags',
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: '50$/day',
      },
    ],
  },
  {
    image:
      'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    name: 'Turbo X 2010',
    type: 'Exclusive',
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: '5 Passengers',
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Provide hub',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: '6 Bags',
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: '50$/day',
      },
    ],
  },
  {
    image:
      'https://c.ndtvimg.com/2019-08/k8519lf8_bugatti-centodieci-unveiled-at-pebble-beach-car-show_625x300_17_August_19.jpg',
    name: 'Turbo X 2010',
    type: 'Exclusive',
    rating: 3,
    configs: [
      {
        icon: 'users',
        type: 'passenger',
        value: '5 Passengers',
      },
      {
        icon: 'truck',
        type: 'provided',
        value: 'Provide hub',
      },
      {
        icon: 'briefcase',
        type: 'bag',
        value: '6 Bags',
      },
      {
        icon: 'dollar-sign',
        type: 'price',
        value: '50$/day',
      },
    ],
  },
];

const SelectCarScreen = ({ navigation, carList, getCarList }: PropTypes) => {
  useEffect(() => {
    getCarList();
  }, []);
  const onBackPress = () => {
    navigation.pop();
  };

  const formatData = () =>
    carList.map(car => ({
      image: car.images,
      name: car.carModel.name,
      type: car.carModel.type,
      rating: 3,
      configs: [
        {
          icon: 'users',
          type: 'passenger',
          value: `${car.carModel.numberOfSeat} Passengers`,
        },
        {
          icon: 'truck',
          type: 'provided',
          value: car.hub ? 'Provide hub' : 'Shared',
        },
        {
          icon: 'briefcase',
          type: 'bag',
          value: `${car.carModel.numberOfBag || 6} Bags`,
        },
        {
          icon: 'dollar-sign',
          type: 'price',
          value: `${car.price}$/day`,
        },
      ],
    }));

  const renderItem = ({ item, index }) => <SelectCarItem {...item} />;

  const keyExtractor = (item, index) => `${index}`;

  return (
    <ViewContainer haveBackHeader title="Search Car" onBackPress={onBackPress}>
      <Header />
      <FlatList
        data={formatData()}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

export default connect(
  state => ({
    carList: state.car.data,
    loading: state.car.loading,
  }),
  {
    getCarList,
  }
)(SelectCarScreen);
