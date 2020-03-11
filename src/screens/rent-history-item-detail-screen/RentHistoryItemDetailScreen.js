import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
import { NavigationType, RentDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import { getSpecificRental } from '@redux/actions/rentItemDetail';
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
  useEffect(() => {
    const id = navigation.getParam('itemID', '');
    getSpecificRental({ id });
    // console.log('Getting data!!!');
  }, []);
  const startDateFormat = moment(rentDetail.startDate).format('D MMMM, YYYY');
  const duration = subtractDate(rentDetail.startDate, rentDetail.endDate);
  const daysleft = subtractDate(new Date(), rentDetail.endDate);
  const showAttr = [
    { value: rentDetail.carModel.name, label: 'Name' },
    { value: startDateFormat, label: 'Date Of Hire' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${rentDetail.price} $`, label: 'Price Per Day' },
    { value: `${rentDetail.totalCost} $`, label: 'Total' },
    { value: 'rentDetail.pickupHub.name', label: 'Store' },
    { value: daysleft, label: 'Days left' },
    { value: rentDetail.status, label: 'Status' },
  ];
  const maximumValue = daysleft >= 3 ? daysleft * rentDetail.price : 10;

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [returnModalVisible, setReturnModalVisible] = useState(false);

  // const { data } = rentDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleReturn = () => {
    setReturnModalVisible(true);
  };

  const onShowPriceModal = () => {
    setPriceModalVisible(true);
  };

  const onCloseReturnModal = () => {
    setReturnModalVisible(false);
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
        itemID={rentDetail._id}
        visible={returnModalVisible}
        onClose={onCloseReturnModal}
      />
      {daysleft >= 3 && rentDetail.status === 'CURRENT' && (
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
