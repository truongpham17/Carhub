import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import {
  ViewContainer,
  ListItem,
  Button,
  ConfirmPopup,
  QRCodeGenModal,
  alert,
} from 'Components';
import { NavigationType, RentDetailType, CarType } from 'types';
import { connect, useDispatch } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import firebase from 'react-native-firebase';
import { updateSpecificRental, getRentalList } from '@redux/actions/rental';

import { confirmTransaction } from '@redux/actions/transaction';
import {
  getSharingByRentalId,
  getLastestSharingByRental,
  confirmSharing,
} from '@redux/actions/sharing';
import Geolocation from '@react-native-community/geolocation';
import {
  COMPLETED,
  WAITING_FOR_CONFIRM,
  WAITING_FOR_SCAN,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
} from 'Constants/status';
import { changeTransactionStatus, changeSharingStatus } from 'Utils/database';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import PriceSelectModal from './PriceSelectModal';

type PropTypes = {
  navigation: NavigationType,
  rentDetail: RentDetailType,
  isLoading: Boolean,
  updateSpecificRental: () => void,
  confirmTransaction: () => void,
  getSharingByRentalId: () => void,
};

const RentHistoryItemDetailScreen = ({
  navigation,
  rentDetail,
  isLoading,
  updateSpecificRental,
  confirmTransaction,
  getSharingByRentalId,
}: PropTypes) => {
  const dispatch = useDispatch();
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmPopupVisibie, setConfirmPopupVisible] = useState(false);
  const [selectedCar, setSelectedCar]: [CarType] = useState({ carModel: {} });
  const { popToHistoryScreen } = navigation.state.params;

  useEffect(() => {
    if (generateNewQR) {
      generateValue('');
    }
    setGenerateNewQR(false);
  }, [generateNewQR]);

  const openListenner = () => {
    changeTransactionStatus(rentDetail._id, WAITING_FOR_SCAN);
    firebase
      .database()
      .ref(`scanQRCode/${rentDetail._id}`)
      .on('value', snapShot => {
        const val = snapShot.val();

        switch (val.status) {
          case COMPLETED: {
            setQrCodeModalVisible(false);
            getRentalList(dispatch)({
              onSuccess() {},
              onFailure() {
                navigation.pop();
              },
            });

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
            setSelectedCar(val.car);

            setConfirmPopupVisible(true);
            break;
          }
          case CANCEL: {
            setQrCodeModalVisible(false);
            setTimeout(() => {
              Alert.alert('Transaction declined!');
            }, 500);
            break;
          }

          default: {
            console.log('error');
          }
        }
      });
  };

  const listenerSharing = () => {
    firebase
      .database()
      .ref(`sharing/${rentDetail.shareRequest}`)
      .on('value', snapShot => {
        const val = snapShot.val();
        console.log('come here!!!');
        switch (val.status) {
          case 'CONFIRM_BY_HOST':
            setQrCodeModalVisible(false);
            setTimeout(() => {
              alert({
                title: 'Confirm receiving car',
                detail: 'Are you sure to confirm receiving car',
                onConfirm() {
                  changeSharingStatus(rentDetail._id, 'COMPLETE');
                  confirmSharing(dispatch)(
                    { id: rentDetail._id, requestId: rentDetail.shareRequest },
                    {
                      onSuccess() {
                        getRentalList(dispatch)();
                        console.log('success');
                      },
                      onFailure() {
                        console.log('failure');
                      },
                    }
                  );
                },
              });
            }, 300);

            break;
          default:
            console.log('error');
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
    { value: rentDetail.carModel.name, label: 'Name' },
    {
      value: rentDetail.car ? rentDetail.car.licensePlates : 'Not specified',
      label: 'License Plate',
    },
    { value: startDateFormat, label: 'Date Of Hire' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${rentDetail.price} $`, label: 'Price Per Day' },
    { value: `${rentDetail.totalCost} $`, label: 'Total' },
    { value: rentDetail.pickupHub.name, label: 'Store' },
    { value: daysdiff, label: typeofDate },
    { value: rentDetail.status, label: 'Status' },
  ];
  if (!typeofDate) {
    showAttr.splice(6, 2);
  }
  // if (rentDetail.status !== 'UPCOMING' && rentDetail.status !== 'DECLINED') {
  //   showAttr.splice(1, 0, {
  //     value: rentDetail.car.licensePlates,
  //     label: 'License Plate',
  //   });
  // }
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
              Alert.alert('Success', 'Cancel sharing successfully', [
                { text: 'OK', onPress: () => popToHistoryScreen() },
              ]);
            },
            onFailure() {
              alert('Something went wrong');
            },
          }
        );
        break;
      case 'SHARE_REQUEST/ACCEPTED':
        listenerSharing();
        changeSharingStatus(rentDetail.shareRequest, 'WAITING_FOR_CONFIRM');
        setValueForQR(JSON.stringify({ id: rentDetail.shareRequest }));
        setQrCodeModalVisible(true);
        break;
      default:
        return {};
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

  const handleConfirmPopup = () => {
    setPopupVisible(false);
    popToHistoryScreen();
  };

  const handleSubmitSharing = ({ price, fromDate, toDate }) => {
    // Agree sharing
    setPriceModalVisible(false);
    navigation.navigate('SelectLocationScreen', {
      titleScreen: 'Choose sharing location',
      callback(location) {
        console.log(location);
        updateSpecificRental(
          {
            id: rentDetail._id,
            status: 'SHARING',
            geometry: location.geometry,
            price,
            address: location.address,
            fromDate,
            toDate,
            log: {
              type: 'CREATE_SHARING',
              title: 'Request sharing car',
            },
          },
          {
            onSuccess() {
              Alert.alert('Success!', 'Other can see your sharing', [
                { text: 'OK', onPress: () => popToHistoryScreen() },
              ]);
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
      case 'SHARE_REQUEST/ACCEPTED':
        return 'Confirm receive car';
      default:
        return 'RETURN CAR';
    }
  };

  const onConfirmReceiveCar = () => {
    changeTransactionStatus(rentDetail._id, COMPLETED);
    setConfirmPopupVisible(false);

    confirmTransaction(
      { id: rentDetail._id, type: 'rental', car: selectedCar._id },
      {
        onSuccess() {
          getRentalList(dispatch)();
          // navigation.pop();
          // popToHistoryScreen();
        },
      }
    );
  };

  const onCancelTransaction = () => {
    changeTransactionStatus(rentDetail._id, CANCEL);
    setConfirmPopupVisible(false);
  };

  const handleViewRequestList = () => {
    getLastestSharingByRental(dispatch)(rentDetail._id, {
      onSuccess() {
        navigation.navigate('RentSharingRequestScreen');
      },
      onFailure() {
        alert('Something wrong here!');
      },
    });
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

      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
        onPress={() =>
          navigation.navigate('TimeLineScreen', { id: rentDetail._id })
        }
      >
        <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
          Time line
        </Text>
      </TouchableOpacity>
      {rentDetail.status !== 'DECLINED' &&
        rentDetail.status !== 'SHARE_REQUEST/PENDING' && (
          <Button
            label={getActionLabel()}
            onPress={handleActionButton}
            style={styles.button}
          />
        )}
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

      {rentDetail.status === 'SHARING' && (
        <Button
          label="List request"
          onPress={handleViewRequestList}
          style={styles.button}
        />
      )}
      <PriceSelectModal
        visible={priceModalVisible}
        onClose={onClosePriceModal}
        onSubmit={handleSubmitSharing}
        endDate={rentDetail.endDate}
        suggestCost={maximumValue * 0.6}
        maximumCost={maximumValue}
        minimumCost={maximumValue * 0.3}
      />
      <ConfirmPopup
        title="Successfully"
        description="Transaction success"
        modalVisible={popupVisible}
        onClose={() => handleConfirmPopup}
        onConfirm={() => handleConfirmPopup}
      />
      <ConfirmPopup
        title="Confirm take car?"
        description={`Are you sure to take the ${selectedCar.carModel.name} with license plates: ${selectedCar.licensePlates}?`}
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
    rentDetail: state.rental.data.rentals.find(
      item => item._id === state.rental.selectedId
    ),
    isLoading: state.rental.isLoading,
  }),
  {
    updateSpecificRental,
    confirmTransaction,
    getSharingByRentalId,
  }
)(RentHistoryItemDetailScreen);
