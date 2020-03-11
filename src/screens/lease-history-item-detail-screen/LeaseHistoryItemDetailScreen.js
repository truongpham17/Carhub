import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ViewContainer, ListItem, Button } from 'Components';
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
  useEffect(() => {
    const id = navigation.getParam('itemID', '');
    getLease({ id });
    // console.log('Getting data!!!');
  }, []);
  const startDateFormat = moment(leaseDetail.startDate).format('D MMMM, YYYY');
  const endDateFormat = moment(leaseDetail.endDate).format('D MMMM, YYYY');
  const duration = subtractDate(leaseDetail.startDate, leaseDetail.endDate);
  const daysleft = subtractDate(new Date(), leaseDetail.endDate);
  const showAttr = [
    { value: leaseDetail.car.carModel.name, label: 'Car Name' },
    { value: startDateFormat, label: 'From date' },
    { value: endDateFormat, label: 'To date' },
    { value: `${duration} days`, label: 'Duration' },
    { value: `${leaseDetail.price} $`, label: 'Price Per Day' },
    { value: `${leaseDetail.totalEarn} $`, label: 'Total earn' },
    { value: leaseDetail.hub, label: 'Hub' },
    { value: daysleft, label: 'Days left' },
    { value: leaseDetail.status, label: 'Status' },
  ];

  // const { data } = leaseDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleReturn = () => {};

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
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
      <Button label="RETURN" onPress={handleReturn} style={styles.button} />
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
