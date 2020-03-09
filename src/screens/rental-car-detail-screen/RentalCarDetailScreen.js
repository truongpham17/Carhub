import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, Button } from 'Components';
import {
  RentailCarDetailType,
  NavigationType,
  CarType,
  GeoLocationType,
  HubType,
} from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';
import { dimension } from 'Constants';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Item from './Item';
import Liberty from './Liberty';
import Description from './Description';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
  carList: [CarType],
  loading: Boolean,
  id: String,
  rentalSearch: {
    startDate: Date,
    endDate: Date,
    startLocation: GeoLocationType,
    endLocation: GeoLocationType,
  },
};

const RentalCarDetailScreen = ({
  rentalDetail,
  navigation,
  carList,
  loading,
  id,
  rentalSearch,
}: PropsType) => {
  const [returnHub, setReturnHub]: [HubType] = useState();

  const onBackPress = () => {
    navigation.goBack();
  };

  const car = carList.find(item => item._id === id);

  const handleChangeTripDate = () => {};
  const handleShowPickupLoc = () => {};
  const handleShowReturnLoc = () => {};

  const goToCheckOut = () => {};

  const onSelectReturnHub = () => {
    navigation.navigate('SelectMapScreen', {
      callback(hub) {
        setReturnHub(hub);
        navigation.pop();
      },
      type: 'hub',
      location: rentalSearch.endLocation.geometry,
    });
  };

  const onShowPickUpLocation = () => {
    navigation.navigate('SelectMapScreen', {
      type: 'none',
      location: rentalSearch.startLocation.geometry,
    });
  };

  return (
    <ViewContainer onBackPress={onBackPress} scrollable safeArea={false}>
      <ImageSlider images={car.images} />
      <Header
        name={car.carModel.name}
        type={car.carModel.type}
        star={4}
        trip={20}
        price={car.price}
        total={500}
      />
      <Item
        title="Trip dates"
        data={[
          {
            value: `Start date: ${moment(rentalSearch.startDate).format(
              'DD MMM YYYY'
            )}, 10:00 AM`,
          },
          {
            value: `End date: ${moment(rentalSearch.endDate).format(
              'DD MMM YYYY'
            )}, 10:00 AM`,
          },
        ]}
      />

      <Item
        title="PICK UP LOCATION"
        data={[{ value: car.currentHub.address }]}
        showAction
        actionLabel="SHOW"
        onActionPress={onShowPickUpLocation}
      />
      <Item
        title="PICK OFF LOCATION"
        data={[{ value: (returnHub && returnHub.address) || '' }]}
        showAction
        actionLabel="SELECT HUB"
        onActionPress={onSelectReturnHub}
      />

      <Item
        title="Cancellation policy"
        data={[
          { value: 'Free cancellation', style: textStyle.bodyTextBold },
          {
            value: `Full refund before ${moment(rentalSearch)
              .add(3, 'day')
              .format('DD MMM')}, 10:00 AM`,
          },
        ]}
      />
      <Liberty
        data={[
          {
            icon: { name: 'users' },
            value: `${car.carModel.numberOfSeat} seats`,
          },
          {
            icon: { name: 'briefcase' },
            value: `${car.carModel.numberOfBag} bags`,
          },
          { icon: { name: 'filter' }, value: `${car.carModel.fuelType}` },
          { icon: { name: 'radio' }, value: `${car.carModel.wheel}` },
        ]}
      />

      <Description description={car.description} />

      <View style={styles.buttonContainer}>
        <Button label="GO TO CHECKOUT" onPress={goToCheckOut} />
      </View>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: scaleVer(250),
    borderRadius: 8,
    marginBottom: scaleVer(20),
    width: dimension.SCREEN_WIDTH,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scaleVer(5),
  },
  dateItem: {
    flex: 1,
    justifyContent: 'center',
  },
  libertyItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  libertyContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: scaleVer(28),
  },
});

export default connect(state => ({
  carList: state.car.data,
  loading: state.car.loading,
  id: state.car.selectedCar,
  rentalSearch: state.car.rentalSearch,
}))(RentalCarDetailScreen);
