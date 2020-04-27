import React from 'react';
import { View, Text } from 'react-native';
import { ViewContainer, Button, ProgressStep, ListItem } from 'Components';
import { RentDetailType, NavigationType } from 'types';

import { scaleVer, scaleHor } from 'Constants/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'Utils/date';
import { textStyle } from 'Constants/textStyles';
import {
  createSharing,
  setPopUpData,
  cancelPopup,
  getRentalList,
} from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
};

const SharingConfirmationScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();

  const { sharingRequestData, loading } = useSelector(state => state.sharing);

  const rentDetail: RentDetailType = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  const data = [
    {
      label: 'Car',
      value: rentDetail.carModel.name,
    },
    {
      label: 'From',
      value: formatDate(sharingRequestData.time),
    },
    { label: 'To', value: formatDate(rentDetail.endDate) },
    { label: 'Sharing price', value: sharingRequestData.price },
    { label: 'Address', value: sharingRequestData.address.address },
  ];

  const onBackPress = () => {
    navigation.pop();
  };

  const onConfirmShare = () => {
    createSharing(dispatch)(
      {
        address: sharingRequestData.address.address,
        geometry: sharingRequestData.address.geometry,
        fromDate: sharingRequestData.time,
        toDate: rentDetail.endDate,
        price: sharingRequestData.price,
        rental: rentDetail._id,
      },
      {
        onSuccess() {
          setTimeout(() => {
            setPopUpData(dispatch)({
              popupType: 'success',
              title: 'Sharing successfully',
              description:
                'Your sharing request has been sent successfully! We will notify you when some one want to hire your rental car',
              onConfirm() {
                console.log('on confirm');
                getRentalList(dispatch)();
                cancelPopup(dispatch);
                navigation.navigate('RentHistoryItemDetailScreen');
              },
            });
          }, 500);
        },
        onFailure() {
          console.log('on failure!!!!');
          setPopUpData(dispatch)({
            popupType: 'error',
            title: 'Error',
            description:
              'There was an error while create your sharing. Please try again!',
          });
        },
      }
    );
  };

  const askUserForConfirm = () => {
    setPopUpData(dispatch)({
      title: 'Confirm request sharing your car?',
      onConfirm() {
        cancelPopup(dispatch);
        onConfirmShare();
      },
    });
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Sharing"
      onBackPress={onBackPress}
      loading={loading}
    >
      <View style={{ flex: 1 }}>
        <ProgressStep
          labels={['Time', 'Price', 'Address', 'Complete']}
          currentStep={3}
          style={{ marginBottom: scaleVer(4) }}
          titleStyle={{ paddingStart: scaleHor(12), paddingEnd: 0 }}
          headerStyle={{ paddingHorizontal: scaleHor(12) }}
        />

        <Text
          style={[
            textStyle.widgetItem,
            { textAlign: 'center', marginVertical: scaleVer(12) },
          ]}
        >
          Sharing information
        </Text>
        {data.map((item, index) => (
          <ListItem
            label={item.label}
            type="detail"
            showSeparator={index !== data.length - 1}
            detail={item.value}
            key={index}
            pressable={false}
          />
        ))}
      </View>

      <Button
        label="Confirm share"
        style={{ marginBottom: scaleVer(12) }}
        onPress={askUserForConfirm}
      />
    </ViewContainer>
  );
};

export default SharingConfirmationScreen;
