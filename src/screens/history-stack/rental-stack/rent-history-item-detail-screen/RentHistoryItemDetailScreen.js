import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import {
  ViewContainer,
  ListItem,
  Button,
  QRCodeGenModal,
  alert,
  PolicyPopup,
} from 'Components';
import { NavigationType, RentDetailType, CarType } from 'types';
import { connect, useDispatch } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import firebase from 'react-native-firebase';
import { updateSpecificRental, getRentalList } from '@redux/actions/rental';
import policy from 'Constants/policy';

import { confirmTransaction } from '@redux/actions/transaction';
import {
  getSharingByRentalId,
  getLastestSharingByRental,
  confirmSharing,
} from '@redux/actions/sharing';
import { changeSharingStatus } from 'Utils/database';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { substractDate } from 'Utils/date';
import { setPopUpData, cancelPopup } from '@redux/actions';
import PriceSelectModal from './PriceSelectModal';
import {
  getActionLabel,
  getShowingData,
  getUpdateRentalData,
  generateQRCodeValue,
  listenFirebaseStatus,
} from './utils';

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
  getSharingByRentalId,
}: PropTypes) => {
  const dispatch = useDispatch();
  const [valueForQR, setValueForQR] = useState('');
  const [generateNewQR, setGenerateNewQR] = useState(true);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [policyPopupVisible, setPolicyVisible] = useState(false);
  const showAttr = getShowingData(rentDetail);

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
    if (rentDetail.status === 'CURRENT' || rentDetail.status === 'OVERDUE') {
      setPopUpData(dispatch)({
        popupType: 'confirm',
        title: 'Return car to hub',
        description: 'Are you sure to return car to hub?',
        onConfirm() {
          cancelPopup(dispatch);
          setValueForQR(JSON.stringify(generateQRCodeValue(rentDetail._id)));
          setQrCodeModalVisible(true);
          listenFirebaseStatus({
            dispatch,
            rental: rentDetail,
            onCloseModal() {
              setQrCodeModalVisible(false);
            },
          });
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

  const handleSubmitSharing = value => {
    // Agree sharing
    setPriceModalVisible(false);
    navigation.navigate('SelectLocationScreen', {
      callback(location) {
        updateSpecificRental(getUpdateRentalData(rentDetail, location, value), {
          onSuccess() {
            Alert.alert('Success!');
          },
          onFailure() {
            Alert.alert('Error!');
            updateSpecificRental({
              id: rentDetail._id,
              status: rentDetail.status,
            });
          },
        });
      },
    });
  };

  const daysdiff = Math.abs(substractDate(new Date(), rentDetail.endDate));

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
      {!['DECLINED', 'SHARE_REQUEST/PENDING'].includes(rentDetail.status) && (
        <Button
          label={getActionLabel(rentDetail.status)}
          onPress={handleActionButton}
          style={styles.button}
        />
      )}

      {daysdiff >= 3 && rentDetail.status === 'CURRENT' && (
        <Button
          label="SHARE TO OTHER"
          onPress={() => setPolicyVisible(true)}
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
        onClose={() => setPriceModalVisible(false)}
        onSubmit={handleSubmitSharing}
        suggestCost={rentDetail.price * 0.6}
        maximumCost={rentDetail.price}
        minimumCost={rentDetail.price * 0.3}
      />

      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={() => setQrCodeModalVisible(false)}
        setGenerateNewQR={setGenerateNewQR}
      />

      <PolicyPopup
        visible={policyPopupVisible}
        onClose={() => setPolicyVisible(false)}
        onConfirm={() => {
          setPolicyVisible(false);
          setPriceModalVisible(true);
        }}
        onDecline={() => setPolicyVisible(false)}
        title="Share your rental car"
        content={policy.SHARE_A_CAR}
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
