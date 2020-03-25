import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import {
  ViewContainer,
  ListItem,
  Button,
  ConfirmPopup,
  QRCodeGenModal,
} from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import { updateLeaseStatus, getLeaseList } from '@redux/actions/lease';
import firebase from 'react-native-firebase';
import {
  WAITING_FOR_SCAN,
  COMPLETED,
  WAITING_FOR_CONFIRM,
  WAITING_FOR_USER_CONFIRM,
  CANCEL,
} from 'Constants/status';
import { changeTransactionStatus } from 'Utils/database';
import { confirmTransaction } from '@redux/actions/transaction';

type PropTypes = {
  navigation: NavigationType,
  // {
  //   state: {
  //     params: {
  //       onUpdateSuccess: () => void,
  //     },
  //   },
  //   goBack: () => void,
  // },
  leases: [LeaseDetailType],
  // getLease: () => void,
  updateLeaseStatus: () => void,
  isLoading: Boolean,
  selectedId: string,
  confirmTransaction: () => void,
  getLeaseList: () => void,
};

const LeaseHistoryItemDetailScreen = ({
  navigation,
  leases,
  isLoading,
  updateLeaseStatus,
  confirmTransaction,
  getLeaseList,
  selectedId,
}: PropTypes) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [confirmPopupVisibie, setConfirmPopupVisible] = useState(false);
  const leaseDetail = leases.find(item => item._id === selectedId);

  const startDateFormat = moment(leaseDetail.startDate).format('D MMMM, YYYY');
  const endDateFormat = moment(leaseDetail.endDate).format('D MMMM, YYYY');
  const duration = subtractDate(leaseDetail.startDate, leaseDetail.endDate);
  const daysleft = subtractDate(new Date(), leaseDetail.endDate);

  // useEffect(
  //   () =>
  //     firebase
  //       .database()
  //       .ref(`scanQRCode/${leaseDetail._id}`)
  //       .off('value'),
  //   []
  // );
  const openListenner = () => {
    changeTransactionStatus(leaseDetail._id, WAITING_FOR_SCAN);
    firebase
      .database()
      .ref(`scanQRCode/${leaseDetail._id}`)
      .on('value', snapShot => {
        switch (snapShot.val().status) {
          case WAITING_FOR_CONFIRM:
            setQrCodeModalVisible(false);
            setTimeout(() => {
              Alert.alert('Waiting for confirm!');
            }, 500);
            break;
          case COMPLETED: {
            setQrCodeModalVisible(false);
            setTimeout(() => {
              Alert.alert('Transaction success!');
              getLeaseList();
              navigation.pop();
            }, 500);
            break;
          }
          case WAITING_FOR_USER_CONFIRM: {
            setQrCodeModalVisible(false);
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
  const onConfirmReceiveCar = () => {
    changeTransactionStatus(leaseDetail._id, COMPLETED);
    setConfirmPopupVisible(false);
    confirmTransaction(
      { id: leaseDetail._id, type: 'lease' },
      {
        onSuccess() {
          getLeaseList();
          navigation.pop();
        },
      }
    );
  };

  const onCancelTransaction = () => {
    changeTransactionStatus(leaseDetail._id, CANCEL);
    setConfirmPopupVisible(false);
  };

  const generateValue = type => {
    const value = {
      id: leaseDetail._id,
      type,
      expired: new Date().getTime() + 1 * 60000,
    };
    setValueForQR(JSON.stringify(value));
    setQrCodeModalVisible(true);
  };

  const genStatus = () => {
    switch (leaseDetail.status) {
      case 'WAIT_TO_RETURN':
        return 'Wait to return';
      default:
        return leaseDetail.status;
    }
  };
  // const { onUpdateSuccess } = navigation.state.params;
  const showAttr = [
    { value: leaseDetail.car.carModel.name, label: 'Car Name' },
    { value: startDateFormat, label: 'From date' },
    { value: endDateFormat, label: 'To date' },
    { value: `${duration} day(s)`, label: 'Duration' },
    {
      value: leaseDetail.price > 0 ? `$ ${leaseDetail.price}` : `$ 0`,
      label: 'Price Per Day',
    },
    { value: `$ ${leaseDetail.totalEarn}`, label: 'Total earn' },
    // leaseDetail.hub.name
    { value: leaseDetail.hub.name, label: 'Hub' },
    { value: daysleft > 0 ? daysleft : 'None', label: 'Days left' },
    { value: genStatus(), label: 'Status' },
  ];

  if (leaseDetail.status === 'PENDING' || leaseDetail.status === 'PAST') {
    showAttr.splice(7, 1);
  }
  if (
    leaseDetail.status !== 'PENDING' &&
    leaseDetail.status !== 'DECLINED' &&
    leaseDetail.status !== 'ACCEPTED'
  ) {
    showAttr.splice(1, 0, {
      value: leaseDetail.car.licensePlates,
      label: 'License Plate',
    });
  }

  // const { data } = leaseDetail;
  const onBackPress = () => {
    navigation.goBack();
  };

  const onCloseQrCodeModal = () => {
    setQrCodeModalVisible(false);
  };

  const handleRequestReceive = () => {
    setPopupVisible(true);
  };

  const handleConfirmRequest = () => {
    updateLeaseStatus({
      id: leaseDetail._id,
      status: 'WAIT_TO_RETURN',
    });
    setPopupVisible(false);
    navigation.popToTop();
  };

  const handleConfirmPopup = () => {
    setPopupVisible(false);
    navigation.popToTop();
  };

  const onRequestTransaction = () => {
    generateValue('lease');
    openListenner();
  };

  const getLabel = () => {
    switch (leaseDetail.status) {
      case 'AVAILABLE':
        return 'Request receive';
      case 'WAIT_TO_RETURN':
        return 'Confirm receive';
      case 'ACCEPTED':
        return 'Confirm placing car';
      default:
        return 'Waiting for confirm';
    }
  };

  const handleRequestAction = () => {
    switch (leaseDetail.status) {
      case 'AVAILABLE':
        handleRequestReceive();
        return;
      case 'WAIT_TO_RETURN':
        onRequestTransaction();
        return;
      case 'ACCEPTED':
        onRequestTransaction();
        return;
      default:
        return null;
    }
  };

  const renderButton = () => {
    if (
      ['AVAILABLE', 'WAIT_TO_RETURN', 'ACCEPTED'].includes(leaseDetail.status)
    ) {
      return (
        <Button
          label={getLabel()}
          // label="Request receive"
          onPress={handleRequestAction}
          style={styles.button}
        />
      );
    }
    return null;
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
      loading={isLoading}
    >
      <Image
        source={{ uri: leaseDetail.car.images[0] }}
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
      {renderButton()}

      <ConfirmPopup
        title="CONFIRM"
        description="Would you like to request returning your car?"
        modalVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={handleConfirmRequest}
      />
      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={onCloseQrCodeModal}
        setGenerateNewQR={setGenerateNewQR}
      />
      {/* <ConfirmPopup
        title="Successfully"
        description="Transaction success"
        modalVisible={popupVisible}
        onClose={() => handleConfirmPopup}
        onConfirm={() => handleConfirmPopup}
      /> */}
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
    leases: state.lease.data.leases,
    selectedId: state.lease.selectedId,
    isLoading: state.lease.loading,
  }),
  { updateLeaseStatus, confirmTransaction, getLeaseList }
)(LeaseHistoryItemDetailScreen);
