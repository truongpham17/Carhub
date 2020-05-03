import React from 'react';
import { View } from 'react-native';
import { ViewContainer, ListItem } from 'Components';
import { NavigationType, SharingType } from 'types';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { setPopUpData } from '@redux/actions';
import { substractDate } from 'Utils/date';

type PropsType = {
  navigation: NavigationType,
  // getSharingByRentalId: () => void,
  loading: Boolean,
  error: String,
  sharing: SharingType,
};

const SharingDetailScreen = ({
  navigation,
  loading,
  error,
  sharing,
}: PropsType) => {
  const dispatch = useDispatch();

  const startDateFormat = moment(sharing.rental.startDate).format(
    'D MMMM, YYYY'
  );
  const endDateFormat = moment(sharing.rental.endDate).format('D MMMM, YYYY');
  // const duration = substractDate(rentDetail.startDate, rentDetail.endDate);

  const data = {
    rental: [
      {
        label: 'Share to',
        detail: sharing.customer.fullName,
        pressable: true,
        onItemPress() {
          setPopUpData(dispatch)({
            popupType: 'profile',
            description: sharing.customer,
          });
        },
        nextIcon: 'next',
      },
      { label: 'Car name', detail: sharing.rental.carModel.name },
      { label: 'Car type', detail: sharing.rental.carModel.type },
      { label: 'Seats', detail: sharing.rental.carModel.numberOfSeat },
      { label: 'Start Date', detail: startDateFormat },
      { label: 'End Date', detail: endDateFormat },
      { label: 'Price per day', detail: sharing.price },
      {
        label: 'Total',
        detail: substractDate(sharing.fromDate, sharing.toDate) * sharing.price,
      },
      { label: 'Location', detail: sharing.address },
      {
        label: 'Car return address',
        detail: sharing.rental.pickoffHub.address,
      },
    ],
  };

  return (
    <ViewContainer
      haveBackHeader
      onBackPress={() => navigation.pop()}
      title="Sharing Detail"
      loading={loading}
      scrollable
    >
      <View>
        {/* <Text>Rental Information</Text> */}
        {data.rental.map((item, index) => (
          <ListItem
            key={index.toString()}
            type="detail"
            pressable={false}
            showSeparator={index !== data.rental.length - 1}
            {...item}
          />
        ))}
      </View>
    </ViewContainer>
  );
};

export default connect(state => ({
  sharing: state.sharing.specificSharing,
}))(SharingDetailScreen);
