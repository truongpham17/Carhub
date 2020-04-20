import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { RNCamera } from 'react-native-camera';

import BarcodeMask from 'react-native-barcode-mask';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType, RentDetailType } from 'types';
import { ViewContainer } from 'Components';
import { setPopUpData, cancelPopup, getRentalList } from '@redux/actions';
import { changeSharingStatus } from 'Utils/database';
import {
  WAITING_FOR_CONFIRM,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
  COMPLETED,
  USER_CANCEL,
  TRANSACTION_ERROR,
} from 'Constants/status';
import firebase from 'react-native-firebase';

type PropTypes = {
  navigation: NavigationType,
};

const ScanScreen = ({ navigation }: PropTypes) => {
  const [barcode, setBarcode] = useState(null);
  const sharingRequestList = useSelector(
    state => state.sharing.rentalRequestList
  );
  const acceptedSharing = sharingRequestList.find(
    item => item.status === 'ACCEPTED'
  );
  const rentDetail: RentDetailType = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  if (!acceptedSharing) {
    navigation.pop();
    setPopUpData(dispatch)({
      popupType: 'error',
      title: 'Access denined',
    });
  }
  const dispatch = useDispatch();
  const onBackPress = () => {
    navigation.pop();
  };

  const listenSharingStatus = id => {
    firebase
      .database()
      .ref(`sharing/${id}`)
      .on('value', snap => {
        console.log('snap: ', snap);
        const val = snap.val();

        switch (val.status) {
          case COMPLETED:
            setPopUpData(dispatch)({
              popupType: 'success',
              title: 'Success',
              description:
                'Transfer car successfully. You will receive money from this sharing soon.',
            });
            navigation.pop();
            getRentalList(dispatch)();
            break;
          case TRANSACTION_ERROR:
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Error',
              description:
                'There was an error while sharing car. Please try again!',
            });
            break;
          case USER_CANCEL:
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Transaction denined',
              description: 'User cancelled transaction. Please try again!',
            });
            break;
          default:
        }
      });
  };

  const barcodeRecognize = barcodes => {
    if (!barcode) {
      setBarcode(barcodes.data);
      const data = JSON.parse(`${barcodes.data}`);
      if (!data.id) {
        setPopUpData(dispatch)({
          popupType: 'error',
          title: 'Error',
          description: 'Cannot recognize contract',
          confirmLabel: 'Scan again',
          onConfirm() {
            cancelPopup(dispatch);
            setBarcode(null);
          },
        });
        return;
      }
      if (acceptedSharing._id !== data.id) {
        setPopUpData(dispatch)({
          popupType: 'error',
          title: 'Error',
          description: 'Information not match. Please try again',
          confirmLabel: 'Scan again',
          onConfirm() {
            cancelPopup(dispatch);
            setBarcode(null);
          },
        });
      }
      navigation.pop();
      changeSharingStatus(data.id, WAITING_FOR_CONFIRM);

      setPopUpData(dispatch)({
        title: 'Confirm transfer car',
        description: `Are you sure to transfer the ${rentDetail.carModel.name} with license plates: ${rentDetail.car.licensePlates} to ${acceptedSharing.customer.fullName}`,
        onConfirm() {
          setPopUpData(dispatch)({
            acceptOnly: true,
            title: `Waiting for ${acceptedSharing.customer.fullName} to confirm`,
          });
          changeSharingStatus(data.id, WAITING_FOR_USER_CONFIRM);
          listenSharingStatus(data.id);
        },
        onDecline() {
          cancelPopup(dispatch);
          changeSharingStatus(data.id, CANCEL);
        },
      });
    }
  };

  return (
    <ViewContainer
      title="Scanning car"
      haveBackHeader
      onBackPress={onBackPress}
      style={{ paddingHorizontal: 0 }}
    >
      <RNCamera
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={barcodeRecognize}
      >
        <BarcodeMask />
      </RNCamera>
    </ViewContainer>
  );
};

export default ScanScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '100%',
  },
});
