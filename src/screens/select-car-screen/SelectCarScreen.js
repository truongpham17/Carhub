import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ViewContainer, Button } from 'Components';

import { NavigationType } from 'types';
import { textStyle } from 'Constants/textStyles';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import SelectCarItem from './SelectCarItem';

type PropTypes = {
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

const SelectCarScreen = ({ navigation }: PropTypes) => {
  const onBackPress = () => {
    navigation.pop();
  };

  const renderItem = ({ item, index }) => <SelectCarItem {...item} />;

  const keyExtractor = (item, index) => `${index}`;

  return (
    <ViewContainer haveBackHeader title="Search Car" onBackPress={onBackPress}>
      <View style={styles.header}>
        <View>
          <Text style={textStyle.widgetItem}>Ho Chi Minh, District 4</Text>
          <Text style={textStyle.bodyText}>Aug 20 - Sep 20</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={[textStyle.bodyText, { color: colors.dark40 }]}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleVer(16),
  },
  button: {
    width: scaleHor(64),
    height: scaleHor(32),
    borderRadius: scaleHor(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dark80,
  },
});

export default SelectCarScreen;
