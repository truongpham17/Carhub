import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { ViewContainer, ListItem, Button, ConfirmPopup } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import { getSpecificRental } from '@redux/actions/rentItemDetail';
import firebase from 'react-native-firebase';
import PriceSelectModal from './PriceSelectModal';
import QRCodeGenModal from './QRCodeGenModal';

type PropTypes = {
  navigation: NavigationType,
  rentDetail: RentDetailType,
  getSpecificRental: () => void,
};

const RentHistoryItemDetailScreen = ({
  navigation,
  rentDetail,
  getSpecificRental,
}: PropTypes) => {
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const id = navigation.getParam('itemID', '');
    getSpecificRental({ id });
  }, []);

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
      .ref(`scanQRCode/${rentDetail._id}`)
      .set({
        _id: rentDetail._id,
        status: 'waiting',
      });
    firebase
      .database()
      .ref(`scanQRCode/${rentDetail._id}`)
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
      id: rentDetail._id,
      type,
      expired: new Date().getTime() + 120 * 1000,
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
  const maximumValue = daysdiff >= 3 ? daysdiff * rentDetail.price : 10;

  // const { data } = rentDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleReturn = () => {
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
    console.log(value);
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
      style={{ paddingBottom: scaleVer(16) }}
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
      <Button label="RETURN" onPress={handleReturn} style={styles.button} />
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
        description="Your QR Code has been scanned successfully, dont open it again"
        modalVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={() => setPopupVisible(false)}
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
    rentDetail: state.rentItemDetail.data,
  }),
  { getSpecificRental }
)(RentHistoryItemDetailScreen);
