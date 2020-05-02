import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, Button } from 'Components';
import {
  RentailCarDetailType,
  NavigationType,
  CarType,
  GeoLocationType,
  HubType,
  CarModel,
} from 'types';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { setPickOffHub } from '@redux/actions/car';
import { textStyle } from 'Constants/textStyles';
import { dimension } from 'Constants';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { paypalService } from 'services/paypal';
import { formatDate, substractDate } from 'Utils/date';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Item from './Item';
import Liberty from './Liberty';
import Description from './Description';

type PropsType = {
  rentalDetail: RentailCarDetailType,
  navigation: NavigationType,
  carModels: [{ carModel: CarModel, hub: HubType }],
  loading: Boolean,
  id: String,
  rentalSearch: {
    startDate: Date,
    endDate: Date,
    startLocation: GeoLocationType,
    endLocation: GeoLocationType,
  },
  setPickOffHub: (hub: HubType) => void,
};

const RentalCarDetailScreen = ({
  navigation,
  carModels,
  id,
  rentalSearch,
  setPickOffHub,
}: PropsType) => {
  const [returnHub, setReturnHub]: [HubType] = useState();
  const car = carModels.find(item => item.carModel._id === id);

  useEffect(() => {
    if (
      rentalSearch.startLocation.address === rentalSearch.endLocation.address
    ) {
      setReturnHub(car.hub);
    }
  }, []);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onRequestPayment = () => {
    if (!returnHub) return;

    setPickOffHub(returnHub);

    navigation.navigate('RentBookingReview');
  };

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
      <ImageSlider images={car.carModel.images} />
      <Header
        name={car.carModel.name}
        type={car.carModel.type}
        star={4}
        trip={20}
        price={car.carModel.price}
        total={500}
      />
      <Item
        title="Trip dates"
        data={[
          {
            value: `Start date: ${formatDate(
              rentalSearch.startDate
            )}, 10:00 AM`,
          },
          {
            value: `End date: ${formatDate(rentalSearch.endDate)}, 10:00 AM`,
          },
        ]}
      />

      <Item
        title="PICK UP LOCATION"
        data={[{ value: car.hub.address }]}
        showAction
        actionLabel="SHOW"
        onActionPress={onShowPickUpLocation}
      />
      <Item
        title="PICK OFF LOCATION"
        data={[{ value: (returnHub && returnHub.address) || '' }]}
        showAction
        actionLabel={returnHub ? 'CHANGE HUB' : 'SELECT HUB'}
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
            value: `4 bags`,
          },
          { icon: { name: 'filter' }, value: `${car.carModel.fuelType}` },
          { icon: { name: 'radio' }, value: 'automatic' },
        ]}
      />

      <Description description={car.carModel.description} />

      <View style={styles.buttonContainer}>
        <Button label="Select car" onPress={onRequestPayment} />
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

export default connect(
  state => ({
    carModels: state.car.carModels,
    loading: state.car.loading,
    id: state.car.selectedCar,
    rentalSearch: state.car.rentalSearch,
  }),
  { setPickOffHub }
)(RentalCarDetailScreen);
