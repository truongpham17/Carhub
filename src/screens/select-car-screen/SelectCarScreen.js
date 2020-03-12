import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import {
  CarType,
  NavigationType,
  HubType,
  CarModel,
  GeoLocationType,
} from 'types';

import { searchCarList, setSelectedCar } from '@redux/actions/car';

import { connect } from 'react-redux';
import SelectCarItem from './SelectCarItem';
import Header from './Header';

type PropTypes = {
  navigation: NavigationType,
  geometry: {
    lat: Number,
    lng: Number,
  },
  carModels: [{ hub: HubType, carModel: CarModel }],
  // getCarList: () => void,
  searchCarList: () => void,
  loading: Boolean,
  setSelectedCar: string => void,
  rentalSearch: {
    startLocation: GeoLocationType,
    endLocation: GeoLocationType,
  },
};

const SelectCarScreen = ({
  navigation,
  carModels,
  searchCarList,
  loading,
  setSelectedCar,
  rentalSearch,
}: PropTypes) => {
  useEffect(() => {
    searchCarList({
      startLocation: rentalSearch.startLocation,
      endLocation: rentalSearch.endLocation,
    });
  }, []);
  const onBackPress = () => {
    navigation.pop();
  };

  const handleCarPress = _id => {
    setSelectedCar(_id);
    navigation.navigate('RentalCarDetailScreen');
  };

  const formatData = () =>
    carModels.map(info => ({
      // image: car.images,
      _id: info.carModel._id,
      image: info.carModel.images[0],
      name: info.carModel.name,
      type: info.carModel.type,
      distance: info.hub.distance,
      rating: 3,
      configs: [
        {
          icon: 'users',
          type: 'passenger',
          value: `${info.carModel.numberOfSeat} Passengers`,
        },
        {
          icon: 'truck',
          type: 'provided',
          value: info.hub ? 'Provide hub' : 'Shared',
        },
        {
          icon: 'briefcase',
          type: 'bag',
          value: `${info.carModel.numberOfBag || 6} Bags`,
        },
        {
          icon: 'dollar-sign',
          type: 'price',
          value: `${info.carModel.price}$/day`,
        },
      ],
    }));

  const renderItem = ({ item, index }) => (
    <SelectCarItem {...item} onItemPress={handleCarPress} />
  );

  const keyExtractor = (item, index) => `${index}`;

  return (
    <ViewContainer
      haveBackHeader
      title="Search Car"
      onBackPress={onBackPress}
      loading={loading}
    >
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
    carModels: state.car.carModels,
    loading: state.car.loading,
    rentalSearch: state.car.rentalSearch,
  }),
  {
    // getCarList,
    setSelectedCar,
    searchCarList,
  }
)(SelectCarScreen);

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
