import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { ViewContainer } from 'Components';
import {
  NavigationType,
  HubType,
  CarModel,
  GeoLocationType,
  SharingType,
} from 'types';

import { getSharing } from '@redux/actions/sharing';

import { searchCarList, setSelectedCar } from '@redux/actions/car';

import { useDispatch, useSelector } from 'react-redux';
import SelectCarItem from './SelectCarItem';
import Header from './Header';
import { formatData } from './utils';

type RentalSearchType = {
  startLocation: GeoLocationType,
  endLocation: GeoLocationType,
};

type PropTypes = {
  navigation: NavigationType,
  geometry: {
    lat: Number,
    lng: Number,
  },
  loading: Boolean,
};

const SelectCarScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();

  const carModels: [{ hub: HubType, carModel: CarModel }] = useSelector(
    state => state.car.carModels
  );
  const loading = useSelector(state => state.car.loading);
  const rentalSearch: RentalSearchType = useSelector(
    state => state.car.rentalSearch
  );

  const sharingList: [SharingType] = useSelector(state => state.sharing.data);

  useEffect(() => {
    console.log({
      startLocation: rentalSearch.startLocation,
      endLocation: rentalSearch.endLocation,
    });

    getSharing(dispatch)();
    searchCarList(dispatch)({
      startLocation: rentalSearch.startLocation,
      endLocation: rentalSearch.endLocation,
    });
  }, []);

  const onBackPress = () => {
    navigation.pop();
  };

  const handleCarPress = _id => {
    const selectedCarModel = carModels.find(item => item.carModel._id === _id);
    if (selectedCarModel) {
      setSelectedCar(dispatch)(_id);
      navigation.navigate('RentalCarDetailScreen');
    } else {
      const selectedSharing = sharingList.find(item => item._id === _id);
      if (selectedSharing) {
        navigation.navigate('ViewSharingInformation', { selectedId: _id });
      }
    }
  };

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
      style={{ paddingHorizontal: 0 }}
    >
      <Header />
      <FlatList
        data={formatData(carModels, sharingList)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

export default SelectCarScreen;

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
