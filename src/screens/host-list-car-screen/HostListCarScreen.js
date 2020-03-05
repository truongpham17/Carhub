import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { ViewContainer, InputForm, ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { NavigationType } from 'types';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { SearchBar, Icon } from 'react-native-elements';
import CarItem from './CarItem';

type PropTypes = () => {
  navigation: NavigationType,
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

const HostListCarScreen = ({ navigation }: PropTypes) => {
  const onPressBack = () => {
    navigation.pop();
  };
  const updateSearch = () => {};
  const clearSearch = () => {};

  const keyExtractor = (item, index) => index;
  const renderItem = ({ item, index }) => <CarItem {...item} />;

  return (
    <ViewContainer haveBackHeader title="Car list" onBackPress={onPressBack}>
      <SearchBar
        // inputStyle={{ backgroundColor: 'white' }}
        containerStyle={styles.container}
        platform="android"
        onChangeText={updateSearch}
        onClearText={clearSearch}
        placeholder="Car name..."
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 24,
    height: scaleVer(60),
    borderColor: colors.dark80,
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default HostListCarScreen;
