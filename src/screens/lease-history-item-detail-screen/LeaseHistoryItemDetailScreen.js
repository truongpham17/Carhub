import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
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
import { updateLeaseStatus } from '@redux/actions/lease';
import firebase from 'react-native-firebase';

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
  leaseDetail: LeaseDetailType,
  // getLease: () => void,
  updateLeaseStatus: () => void,
  isLoading: Boolean,
};

const LeaseHistoryItemDetailScreen = ({
  navigation,
  leaseDetail,
  isLoading,
  updateLeaseStatus,
}: PropTypes) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  useEffect(() => {
    if (qrCodeModalVisible && generateNewQR) {
      generateValue('return');
      openListenner();
    }
  }, [qrCodeModalVisible, generateNewQR]);
  const openListenner = () => {
    console.log('open listener');
    firebase
      .database()
      .ref(`scanQRCode/${leaseDetail._id}`)
      .set({
        _id: leaseDetail._id,
        status: 'waiting',
      });
    firebase
      .database()
      .ref(`scanQRCode/${leaseDetail._id}`)
      .on('value', snapShot => {
        if (snapShot.val().status === 'completed') {
          setQrCodeModalVisible(false);
          setTimeout(() => {
            setPopupVisible(true);
          }, 500);
        }
      });
  };
  const generateValue = type => {
    const value = {
      id: leaseDetail._id,
      type,
      expired: new Date().getTime() + 1 * 60000,
    };
    setValueForQR(JSON.stringify(value));
  };
  const startDateFormat = moment(leaseDetail.startDate).format('D MMMM, YYYY');
  const endDateFormat = moment(leaseDetail.endDate).format('D MMMM, YYYY');
  const duration = subtractDate(leaseDetail.startDate, leaseDetail.endDate);
  const daysleft = subtractDate(new Date(), leaseDetail.endDate);
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

  // const { data } = leaseDetail;
  const onBackPress = () => {
    navigation.goBack();
  };

  const handleRequestReceive = () => {
    setPopupVisible(true);
  };
  const onCloseQrCodeModal = () => {
    setQrCodeModalVisible(false);
  };
  const handleconfirm = () => {
    setQrCodeModalVisible(true);
  };
  const handleConfirmRequest = () => {
    updateLeaseStatus({
      id: leaseDetail._id,
      status: 'WAIT_TO_RETURN',
    });
    setPopupVisible(false);
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
      {leaseDetail.status === 'AVAILABLE' && (
        <Button
          label="Request receive"
          onPress={handleRequestReceive}
          style={styles.button}
        />
      )}
      {leaseDetail.status === 'WAIT_TO_RETURN' && (
        <Button
          label="Confirm receive"
          onPress={handleconfirm}
          style={styles.button}
        />
      )}
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
    leaseDetail: state.lease.data.leases.find(
      item => item._id === state.lease.selectedId
    ),
    isLoading: state.lease.loading,
  }),
  { updateLeaseStatus }
)(LeaseHistoryItemDetailScreen);
