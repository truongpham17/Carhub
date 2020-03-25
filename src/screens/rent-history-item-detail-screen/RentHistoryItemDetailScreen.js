import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import {
  ViewContainer,
  ListItem,
  Button,
  ConfirmPopup,
  QRCodeGenModal,
} from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import firebase from 'react-native-firebase';
import {
  updateSpecificRental,
  getRentalsList,
} from '@redux/actions/getRentalsList';

import { confirmTransaction } from '@redux/actions/transaction';
import { getSharingByRentalId } from '@redux/actions/sharing';
import Geolocation from '@react-native-community/geolocation';
import {
  COMPLETED,
  WAITING_FOR_CONFIRM,
  WAITING_FOR_SCAN,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
} from 'Constants/status';
import { changeTransactionStatus } from 'Utils/database';
import PriceSelectModal from './PriceSelectModal';

type PropTypes = {
  navigation: {
    state: {
      params: {
        popToHistoryScreen: () => void,
      },
    },
    navigate: () => void,
    pop: () => void,
  },
  rentDetail: RentDetailType,
  isLoading: Boolean,
  updateSpecificRental: () => void,
  confirmTransaction: () => void,
  getRentalsList: () => void,
  getSharingByRentalId: () => void,
};

const RentHistoryItemDetailScreen = ({
  navigation,
  rentDetail,
  isLoading,
  updateSpecificRental,
  confirmTransaction,
  getRentalsList,
  getSharingByRentalId,
}: PropTypes) => {
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmPopupVisibie, setConfirmPopupVisible] = useState(false);
  const [employeeID, setEmployeeID] = useState(null);

  const { popToHistoryScreen } = navigation.state.params;

  const openListenner = () => {
    changeTransactionStatus(rentDetail._id, WAITING_FOR_SCAN);
    firebase
      .database()
      .ref(`scanQRCode/${rentDetail._id}`)
      .on('value', snapShot => {
        console.log(snapShot.val());
        if (!employeeID && snapShot.val().employeeID) {
          setEmployeeID(snapShot.val().employeeID);
        }
        switch (snapShot.val().status) {
          case COMPLETED: {
            setQrCodeModalVisible(false);
            setTimeout(() => {
              setPopupVisible(true);
            }, 500);
            break;
          }
          case WAITING_FOR_CONFIRM: {
            setQrCodeModalVisible(false);
            setTimeout(() => {
              Alert.alert('Waiting for hub confirm');
            }, 500);
            break;
          }
          case WAITING_FOR_USER_CONFIRM: {
            setQrCodeModalVisible(false);
            setConfirmPopupVisible(true);
            break;
          }
          default: {
            console.log('error');
          }
        }
      });
  };

  const generateValue = type => {
    const value = {
      id: rentDetail._id,
      type,
      expired: new Date().getTime() + 1 * 60000,
    };
    setValueForQR(JSON.stringify(value));
  };

  const startDateFormat = moment(rentDetail.startDate).format('D MMMM, YYYY');
  const duration = subtractDate(rentDetail.startDate, rentDetail.endDate);
  const daysdiff = Math.abs(subtractDate(new Date(), rentDetail.endDate));
  let typeofDate = '';
  if (rentDetail.status === 'CURRENT') {
    typeofDate = 'Days left';
  } else if (rentDetail.status === 'OVERDUE') {
    typeofDate = 'Days overdue';
  }
  const showAttr = [
    // rentDetail.carModel.name
    { value: rentDetail.carModel.name, label: 'Name' },
    { value: startDateFormat, label: 'Date Of Hire' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${rentDetail.price} $`, label: 'Price Per Day' },
    { value: `${rentDetail.totalCost} $`, label: 'Total' },
    // rentDetail.pickupHub.name
    { value: rentDetail.pickupHub.name, label: 'Store' },
    { value: daysdiff, label: typeofDate },
    { value: rentDetail.status, label: 'Status' },
  ];
  if (!typeofDate) {
    showAttr.splice(6, 2);
  }

  const maximumValue = daysdiff >= 3 ? rentDetail.price : 10;

  // const { data } = rentDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleActionButton = () => {
    switch (rentDetail.status) {
      case 'CURRENT':
      case 'OVERDUE':
      case 'UPCOMING':
        onRequestTransaction();
        break;
      case 'SHARED':
        getSharingByRentalId(
          { rentalId: rentDetail._id },
          {
            onSuccess() {
              navigation.navigate('SharingDetailScreen');
            },
          }
        );
        break;
      case 'SHARING':
        updateSpecificRental(
          {
            id: rentDetail._id,
            status: 'CURRENT',
            log: {
              type: 'CANCEL_SHARING',
              title: 'Cancel sharing car',
            },
          },
          {
            onSuccess() {
              alert('Cancel sharing successfully');
              setTimeout(() => {
                popToHistoryScreen();
              }, 1000);
            },
            onFailure() {
              alert('Something went wrong');
            },
          }
        );
        break;
      default:
    }
  };

  const onRequestTransaction = () => {
    generateValue('rental');
    openListenner();
    setQrCodeModalVisible(true);
  };

  const onShowPriceModal = () => {
    setPriceModalVisible(true);
  };

  const onCloseQrCodeModal = () => {
    setQrCodeModalVisible(false);
  };

  const onClosePriceModal = () => {
    setPriceModalVisible(false);
  };

  const handleSubmitSharing = value => {
    // Agree sharing
    setPriceModalVisible(false);
    navigation.navigate('SelectLocationScreen', {
      callback(location) {
        console.log(location);
        updateSpecificRental(
          {
            id: rentDetail._id,
            status: 'SHARING',
            geometry: location.geometry,
            price: value,
            address: location.address,
            log: {
              type: 'CREATE_SHARING',
              title: 'Request sharing car',
            },
          },
          {
            onSuccess() {
              Alert.alert('Success!');
              setTimeout(() => {
                popToHistoryScreen();
              }, 1000);
            },
            onFailure() {
              Alert.alert('Error!');
              updateSpecificRental({
                id: rentDetail._id,
                status: rentDetail.status,
              });
            },
          }
        );
      },
    });
  };
  const getActionLabel = () => {
    // 'UPCOMING', 'CURRENT', 'OVERDUE', 'SHARING', 'SHARED', 'PAST'
    switch (rentDetail.status) {
      case 'UPCOMING':
        return 'GET CAR';
      case 'CURRENT':
      case 'OVERDUE':
        return 'RETURN CAR';
      case 'PAST':
        return 'HIRE THIS CAR';
      case 'SHARING':
        return 'CANCEL SHARING';
      case 'SHARED':
        return 'VIEW SHARING';
      default:
        return '';
    }
  };

  const onConfirmReceiveCar = () => {
    changeTransactionStatus(rentDetail._id, COMPLETED);
    setConfirmPopupVisible(false);
    console.log(employeeID);
    confirmTransaction(
      { id: rentDetail._id, type: 'rental', employeeID },
      {
        onSuccess() {
          getRentalsList();
          navigation.pop();
        },
      }
    );
  };

  const onCancelTransaction = () => {
    changeTransactionStatus(rentDetail._id, CANCEL);
    setConfirmPopupVisible(false);
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
      style={{ paddingBottom: scaleVer(16) }}
      loading={isLoading}
    >
      <Image
        source={{
          uri: rentDetail.carModel.images[0],
        }}
        style={styles.imageContainer}
        resizeMode="stretch"
      />
      {showAttr.map((item, index) => (
        <ListItem
          key={index.toString()}
          label={item.label}
          detail={item.value}
          type="detail"
          pressable={false}
          showSeparator={index !== showAttr.length - 1}
        />
      ))}
      <Button
        label={getActionLabel()}
        onPress={handleActionButton}
        style={styles.button}
      />
      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={onCloseQrCodeModal}
        setGenerateNewQR={setGenerateNewQR}
      />
      {daysdiff >= 3 && rentDetail.status === 'CURRENT' && (
        <Button
          label="SHARE TO OTHER"
          onPress={onShowPriceModal}
          style={styles.button}
        />
      )}
      <PriceSelectModal
        visible={priceModalVisible}
        onClose={onClosePriceModal}
        onSubmit={handleSubmitSharing}
        suggestCost={maximumValue * 0.6}
        maximumCost={maximumValue}
        minimumCost={maximumValue * 0.3}
      />
      <ConfirmPopup
        title="Successfully"
        description="Transaction success"
        modalVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={() => setPopupVisible(false)}
      />
      <ConfirmPopup
        title="Confirm take car?"
        description="Are you sure to confirm take your car?"
        modalVisible={confirmPopupVisibie}
        onDecline={onCancelTransaction}
        onConfirm={onConfirmReceiveCar}
        onClose={() => setConfirmPopupVisible(false)}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'stretch',
    height: scaleHor(160),
  },
  button: {
    marginVertical: scaleVer(5),
  },
});

export default connect(
  state => ({
    rentDetail: state.rentalsList.data.rentals.find(
      item => item._id === state.rentalsList.selectedId
    ),
    isLoading: state.rentalsList.isLoading,
  }),
  {
    updateSpecificRental,
    confirmTransaction,
    getRentalsList,
    getSharingByRentalId,
  }
)(RentHistoryItemDetailScreen);
