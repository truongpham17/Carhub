import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
import { NavigationType, SharingType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { useSelector, useDispatch } from 'react-redux';
import {
  substractDate,
  formatDate,
  formatPrice,
  formatDayLabel,
} from 'Utils/date';
import { sendSharingRequest } from '@redux/actions/sharing';

import { setPopUpData, cancelPopup } from '@redux/actions';
import policy from 'Constants/policy';

type PropsType = {
  navigation: NavigationType,
};

const ViewSharingInformation = ({ navigation }: PropsType) => {
  const dispatch = useDispatch();

  const sharingList: [SharingType] = useSelector(state => state.sharing.data);
  const { startDate, endDate } = useSelector(state => state.car.rentalSearch);
  const loading = useSelector(state => state.sharing.loading);

  const user = useSelector(state => state.user);

  const { selectedId } = navigation.state.params;

  const sharing = sharingList.find(item => item._id === selectedId) || {};

  useEffect(() => {
    setPopUpData(dispatch)({
      popupType: 'policy',
      title: 'Hire a sharing car',
      description: {
        ...policy.HIRE_SHARING_CAR,
        content: [
          ...policy.HIRE_SHARING_CAR.content,
          `When you successfully hire this car, to need to return the car to the hub at ${
            sharing.rental.pickoffHub.address
          } before ${formatDate(
            endDate
          )}. Otherwise you will pay some extra money for returning late.`,
        ],
      },
      onDecline() {
        cancelPopup(dispatch);
        navigation.pop();
      },
    });
  }, []);

  // const changesharing = sharing => setsharing(sharing);

  const handleSendRequest = () => {
    setPopUpData(dispatch)({
      title: 'Send request',
      description: 'Send request to take this sharing car?',
      onConfirm() {
        cancelPopup(dispatch);
        sendSharingRequest(dispatch)(
          {
            sharing: sharing._id,
            customer: user._id,
            fromDate: startDate.toISOString(),
            toDate: endDate.toISOString(),
          },
          {
            onSuccess() {
              setPopUpData(dispatch)({
                popupType: 'success',
                title: 'Success',
                description:
                  'Success sent request to hire this sharing car. We will notify you when the request be accepted',
                onConfirm() {
                  cancelPopup(dispatch);
                  navigation.pop(2);
                  navigation.navigate('HistoryScreen');
                },
              });
            },
            onFailure(msg) {
              setPopUpData(dispatch)({
                popupType: 'error',
                title: 'Error',
                description: `There was some error while senting your request. Please try again!\nMessage: ${msg}`,
              });
            },
          }
        );
      },
    });
  };

  const daysdiff = substractDate(startDate, endDate);

  const data = {
    rental: [
      {
        label: 'Sharing owner',
        detail: sharing.rental.customer.fullName,
        pressable: true,
        onItemPress: () => {
          setPopUpData(dispatch)({
            popupType: 'profile',
            description: sharing.rental.customer,
          });
        },
        nextIcon: 'next',
      },
      { label: 'Car name', detail: sharing.rental.carModel.name },
      { label: 'Car type', detail: sharing.rental.carModel.type },
      { label: 'Seats', detail: sharing.rental.carModel.numberOfSeat },
      { label: 'Price per day', detail: formatPrice(sharing.price) },

      { label: 'Start Date', detail: formatDate(startDate) },
      { label: 'End Date', detail: formatDate(endDate) },
      {
        label: 'Duration',
        detail: formatDayLabel(daysdiff),
      },
      { label: 'Total', detail: formatPrice(daysdiff * Number(sharing.price)) },
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
      title="Sharing Detail"
      scrollable
      onBackPress={() => navigation.pop()}
      loading={loading}
    >
      <View style={{ flex: 1 }}>
        {data.rental.map((item, index) => (
          <ListItem
            key={index.toString()}
            type="detail"
            showSeparator
            {...item}
          />
        ))}
      </View>
      <Button
        label="Send request"
        onPress={handleSendRequest}
        style={{ marginBottom: scaleVer(12) }}
      />
    </ViewContainer>
  );
};

export default ViewSharingInformation;
