import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SharingType, NavigationType } from 'types';
import {
  getRentalRequestBySharing,
  setPopUpData,
  cancelPopup,
  acceptSharingRentalRequest,
  cancelSharingRentalRequest,
} from '@redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import RequestItem from './RequestItem';

type PropTypes = {
  newId?: String,
  navigation: NavigationType,
};

const ListRequest = ({ newId, navigation }: PropTypes) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const sharingInformation: SharingType = useSelector(
    state => state.sharing.lastestSharing
  );
  const requestList =
    useSelector(state => state.sharing.rentalRequestList) || [];
  console.log(requestList);

  useEffect(() => {
    if (sharingInformation && sharingInformation._id) {
      getRentalRequestBySharing(dispatch)(sharingInformation._id);
    }
  }, [sharingInformation]);

  const onRefresh = () => {
    setRefresh(true);
    if (sharingInformation && sharingInformation._id) {
      getRentalRequestBySharing(dispatch)(sharingInformation._id);
    }
    setRefresh(false);
  };

  const handleAcceptRequest = requestId => {
    setPopUpData(dispatch)({
      title: 'Accept this request',
      description:
        "Are you sure to accept this request. If you accept, all the others request will be cancel. Make sure that you already contact the request's owner",
      onConfirm() {
        cancelPopup(dispatch);
        acceptSharingRentalRequest(dispatch)(requestId, {
          onSuccess() {
            setPopUpData(dispatch)({
              popupType: 'success',
              title: 'Success',
              description:
                'Successfully accept this request.You wil receive money when you successfully transfer this car',
            });
            getRentalRequestBySharing(dispatch)(sharingInformation._id);
          },
          onFailure() {
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Error',
              description:
                'There was an error while accept request. Please try again!',
            });
          },
        });
      },
    });
  };

  const handleDeclineRequest = requestId => {
    setPopUpData(dispatch)({
      title: 'Decline this request',
      description: 'Are you sure to decline this request?',
      onConfirm() {
        cancelPopup(dispatch);
        cancelSharingRentalRequest(dispatch)(requestId, {
          onSuccess() {
            getRentalRequestBySharing(dispatch)(sharingInformation._id);
          },
        });
      },
    });
  };
  const handleConfirmTransferCar = () => {
    setPopUpData(dispatch)({
      title: 'Confirm transfer car',
      description:
        'Ask your partner to show you the QR Code, and use your phone to scan this.',
      acceptOnly: true,
      onConfirm() {
        cancelPopup(dispatch);
        navigation.navigate('ScanScreen');
      },
    });
  };

  const renderItem = ({ item }) => (
    <RequestItem
      data={item}
      onAcceptRequest={handleAcceptRequest}
      onConfirm={handleConfirmTransferCar}
      isNew={item._id === newId}
      onDeclineRequest={handleDeclineRequest}
    />
  );

  return (
    <FlatList
      refreshing={refresh}
      onRefresh={onRefresh}
      data={requestList}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListRequest;
