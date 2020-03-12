import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button, ConfirmPopup } from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { connect } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import moment from 'moment';
import { subtractDate } from 'Utils/common';
import { getLease } from '@redux/actions/lease';

type PropTypes = {
  navigation: NavigationType,
  leaseDetail: LeaseDetailType,
  getLease: () => void,
};

const LeaseHistoryItemDetailScreen = ({
  navigation,
  leaseDetail,
  getLease,
}: PropTypes) => {
  const [popupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    const id = navigation.getParam('itemID', '');
    getLease({ id });
    // console.log('Getting data!!!');
  }, []);
  const startDateFormat = moment(leaseDetail.startDate).format('D MMMM, YYYY');
  const endDateFormat = moment(leaseDetail.endDate).format('D MMMM, YYYY');
  const duration = subtractDate(leaseDetail.startDate, leaseDetail.endDate);
  const daysleft = subtractDate(new Date(), leaseDetail.endDate);
  console.log(leaseDetail.car.carModel.name);
  const showAttr = [
    // leaseDetail.car.carModel.name ||

    { value: leaseDetail.car.carModel.name, label: 'Car Name' },
    { value: startDateFormat, label: 'From date' },
    { value: endDateFormat, label: 'To date' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${leaseDetail.price} $`, label: 'Price Per Day' },
    { value: `${leaseDetail.totalEarn} $`, label: 'Total earn' },
    // leaseDetail.hub.name
    { value: leaseDetail.hub.name, label: 'Hub' },
    { value: daysleft > 0 ? daysleft : 'None', label: 'Days left' },
    { value: leaseDetail.status, label: 'Status' },
  ];

  // const { data } = leaseDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleRequestReceive = () => {
    setPopupVisible(true);
  };

  const handleconfirm = () => {};

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
    >
      <Image
        // source={{ uri: leaseDetail.car.images[0] }}
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
        description="Would you like to request 
        returning your car?"
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
    leaseDetail: state.lease.data,
  }),
  { getLease }
)(LeaseHistoryItemDetailScreen);
