import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ViewContainer, ListItem } from 'Components';
import { NavigationType, SharingType } from 'types';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import ItemContainer from './ItemContainer';

type PropsType = {
  navigation: NavigationType,
  // getSharingByRentalId: () => void,
  isLoading: Boolean,
  error: String,
  sharing: SharingType,
};

const SharingDetailScreen = ({
  navigation,
  isLoading,
  error,
  sharing,
}: PropsType) => {
  // useEffect(() => {
  //   const rentalId = navigation.getParam(
  //     'rentalId',
  //     '5e79bb948dd18a215c0062e0'
  //   );
  //   getSharingByRentalId({ rentalId });
  // }, []);

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  // console.log(sharing);

  const startDateFormat = moment(sharing.rental.startDate).format(
    'D MMMM, YYYY'
  );
  const endDateFormat = moment(sharing.rental.endDate).format('D MMMM, YYYY');
  // const duration = subtractDate(rentDetail.startDate, rentDetail.endDate);

  const data = {
    rental: [
      { label: 'Car name', value: sharing.rental.carModel.name },
      { label: 'Car type', value: sharing.rental.carModel.type },
      { label: 'Seats', value: sharing.rental.carModel.numberOfSeat },
      { label: 'Start Date', value: startDateFormat },
      { label: 'End Date', value: endDateFormat },
      { label: 'Price per day', value: sharing.price },
      { label: 'Total', value: sharing.totalCost },
      { label: 'Location', value: sharing.address },
      { label: 'Car return address', value: sharing.rental.pickoffHub.address },
    ],
    customer: [
      { label: 'Name', value: sharing.customer.fullName },
      { label: 'Email', value: sharing.customer.email },
      { label: 'Phone', value: sharing.customer.phone },
    ],
  };
  // const data = {
  //   rental: [
  //     { label: 'Car name', value: 'Car name' },
  //     { label: 'Car type', value: 'Car type' },
  //     { label: 'Seats', value: 'Seats' },
  //     { label: 'Start Date', value: 'startDate' },
  //     { label: 'End Date', value: 'endDate' },
  //     { label: 'Price per day', value: '$100' },
  //     { label: 'Total', value: '$100' },
  //     { label: 'Location', value: 'endDate' },
  //     { label: 'Car return address', value: 'endDate' },
  //   ],
  //   customer: [
  //     { label: 'Name', value: 'Name' },
  //     { label: 'Email', value: 'email' },
  //     { label: 'Phone', value: 'sharing.customer.phone' },
  //   ],
  // };

  return (
    <ViewContainer
      haveBackHeader
      onBackPress={() => navigation.pop()}
      title="Sharing Detail"
      isLoading={isLoading}
      scrollable
    >
      <View>
        <ItemContainer title="Renter">
          <View style={{ alignSelf: 'center', paddingTop: scaleVer(8) }}>
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri: sharing.customer.avatar,
              }}
            />
          </View>
          {data.customer.map((item, index) => (
            <ListItem
              key={index.toString()}
              label={item.label}
              detail={item.value}
              type="detail"
              pressable={false}
              showSeparator={index !== data.customer.length - 1}
            />
          ))}
        </ItemContainer>
        <ItemContainer title="Rental Information">
          {data.rental.map((item, index) => (
            <ListItem
              key={index.toString()}
              label={item.label}
              detail={item.value}
              type="detail"
              pressable={false}
              showSeparator={index !== data.rental.length - 1}
            />
          ))}
        </ItemContainer>
      </View>
    </ViewContainer>
  );
};

export default connect(state => ({
  sharing: state.sharing.specificSharing,
}))(SharingDetailScreen);
