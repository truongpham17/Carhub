import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ViewContainer, ListItem, Button, QRCodeGenModal } from 'Components';
import { NavigationType, RentDetailType, CarType } from 'types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import firebase from 'react-native-firebase';
import { updateSpecificRental, getRentalList } from '@redux/actions/rental';
import policy from 'Constants/policy';

import { confirmTransaction } from '@redux/actions/transaction';
import { getSharingByRentalId, confirmSharing } from '@redux/actions/sharing';
import { changeSharingStatus } from 'Utils/database';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { substractDate } from 'Utils/date';
import { setPopUpData, cancelPopup } from '@redux/actions';
import { WAITING_FOR_CONFIRM, WAITING_FOR_SCAN } from 'Constants/status';
import {
  getActionLabel,
  getShowingData,
  generateQRCodeValue,
  listenFirebaseStatus,
  listenSharingStatus,
} from './utils';

type PropTypes = {
  navigation: NavigationType,
  rentDetail: RentDetailType,
  loading: Boolean,
  updateSpecificRental: () => void,
  confirmTransaction: () => void,
  getSharingByRentalId: () => void,
};

const RentHistoryItemDetailScreen = ({
  navigation,
  rentDetail,
  loading,
  getSharingByRentalId,
}: PropTypes) => {
  const dispatch = useDispatch();
  const [valueForQR, setValueForQR] = useState('');
  const [alreadyOpenListener, setOpenListener] = useState(false);
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const showAttr = getShowingData(rentDetail);
  const sharingLoading = useSelector(state => state.sharing.loading);

  console.log(rentDetail.sharing);

  // const { data } = rentDetail;
  const onBackPress = () => {
    navigation.pop();
  };

  const handleActionButton = () => {
    switch (rentDetail.status) {
      case 'CURRENT':
      case 'OVERDUE':
      case 'UPCOMING':
      case 'SHARE_REQUEST/CURRENT':
        onRequestTransaction();
        break;
      case 'SHARING':
        return navigation.navigate('SharingInformationScreen');

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
      case 'SHARE_REQUEST/ACCEPTED':
        changeSharingStatus(rentDetail.shareRequest, WAITING_FOR_SCAN);
        if (!alreadyOpenListener) {
          listenSharingStatus({
            rentDetail,
            dispatch,
            onCloseModal() {
              setQrCodeModalVisible(false);
            },
          });
          setOpenListener(true);
        }
        /**
         * @implements
         */

        setValueForQR(JSON.stringify({ id: rentDetail.shareRequest }));
        setQrCodeModalVisible(true);
        break;
      default:
        return {};
    }
  };

  const onRequestTransaction = () => {
    if (rentDetail.status === 'CURRENT' || rentDetail.status === 'OVERDUE') {
      setPopUpData(dispatch)({
        popupType: 'confirm',
        title: 'Return car to hub',
        description: 'Are you sure to return car to hub?',
        onConfirm() {
          cancelPopup(dispatch);
          setValueForQR(JSON.stringify(generateQRCodeValue(rentDetail._id)));
          setQrCodeModalVisible(true);
          if (!alreadyOpenListener) {
            setOpenListener(true);
            listenFirebaseStatus({
              dispatch,
              rental: rentDetail,
              onCloseModal() {
                setQrCodeModalVisible(false);
              },
            });
          }
        },
      });
    } else {
      setValueForQR(JSON.stringify(generateQRCodeValue(rentDetail._id)));
      setQrCodeModalVisible(true);
      listenFirebaseStatus({
        dispatch,
        rental: rentDetail,
        onCloseModal() {
          setQrCodeModalVisible(false);
        },
      });
    }
  };

  const daysdiff = Math.abs(substractDate(new Date(), rentDetail.endDate));

  const showPolicyPopup = () => {
    setPopUpData(dispatch)({
      popupType: 'policy',
      title: 'Share your rental car',
      description: policy.SHARE_A_CAR,
      onConfirm() {
        cancelPopup(dispatch);
        navigation.navigate('SharingStack');
      },
    });
  };

  const onCancelBooking = () => {
    setPopUpData(dispatch)({
      title: 'Cancel booking',
      description: 'Are you sure to cancel this booking?',
      onConfirm() {
        cancelPopup(dispatch);
        confirmTransaction(dispatch)(
          {
            id: rentDetail._id,
            type: 'rental',
            toStatus: 'CANCEL',
          },
          {
            onSuccess() {
              getRentalList(dispatch)();
            },
          }
        );
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
      loading={loading || sharingLoading}
    >
      <View style={{ flex: 1 }}>
        {showAttr.map((item, index) => (
          <ListItem
            key={index.toString()}
            type="detail"
            pressable={false}
            showSeparator={index !== showAttr.length - 1}
            {...item}
          />
        ))}
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
          onPress={() =>
            navigation.navigate('TimeLineScreen', { id: rentDetail._id })
          }
        >
          <Text
            style={[textStyle.bodyTextBold, { color: colors.successLight }]}
          >
            Time line
          </Text>
        </TouchableOpacity>
      </View>

      {![
        'DECLINED',
        'SHARE_REQUEST/PENDING',
        'CANCEL',
        'PAST',
        'SHARE_REQUEST/PAST',
      ].includes(rentDetail.status) && (
        <Button
          label={getActionLabel(rentDetail.status)}
          onPress={handleActionButton}
          style={styles.button}
        />
      )}
      {rentDetail.status === 'UPCOMING' && (
        <Button
          label="Cancel Booking"
          onPress={onCancelBooking}
          style={styles.button}
          colorStart={colors.errorLight}
          colorEnd={colors.error}
        />
      )}

      {daysdiff >= 3 && rentDetail.status === 'CURRENT' && (
        <Button
          label="SHARE YOUR CAR"
          onPress={showPolicyPopup}
          style={styles.button}
        />
      )}

      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={() => setQrCodeModalVisible(false)}
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
    rentDetail: state.rental.data.rentals.find(
      item => item._id === state.rental.selectedId
    ),
    loading: state.rental.loading,
  }),
  {
    updateSpecificRental,
    confirmTransaction,
    getSharingByRentalId,
  }
)(RentHistoryItemDetailScreen);
