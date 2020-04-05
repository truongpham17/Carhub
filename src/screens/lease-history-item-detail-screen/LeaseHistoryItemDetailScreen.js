import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import {
  ViewContainer,
  ListItem,
  Button,
  ConfirmPopup,
  QRCodeGenModal,
} from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { useSelector, useDispatch } from 'react-redux';
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
import { setPopUpData } from '@redux/actions';
import { formatDate } from 'Utils/date';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { getData, getButtonData, getTransactionValue } from './utils';

type PropTypes = {
  navigation: NavigationType,
  // getLease: () => void,
};

const LeaseHistoryItemDetailScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const leases: [LeaseDetailType] = useSelector(
    state => state.lease.data.leases
  );

  const isLoading = useSelector(state => state.lease.loading);
  const [popupVisible, setPopupVisible] = useState(false);
  const [openSocket, setOpenSocket] = useState(false);
  const [valueForQR, setValueForQR] = useState('');
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [confirmPopupVisibie, setConfirmPopupVisible] = useState(false);
  const { selectedId, showStatusPopup } = navigation.state.params;
  const leaseDetail: LeaseDetailType = leases.find(
    item => item._id === selectedId
  );

  useEffect(() => {
    if (showStatusPopup) {
      if (leaseDetail.status === 'DECLINED') {
        setPopUpData(dispatch)({
          popupType: 'confirm',
          acceptOnly: true,
          title: 'Sorry, we cannot accept your lease request',
          description: `Here is the reason: ${leaseDetail.message}.\nIf you think this is a mistake, please directly contact to us. Thank you for using our service`,
        });
      } else {
        setPopUpData(dispatch)({
          popupType: 'confirm',
          acceptOnly: true,
          title: 'Congratulations! Your lease request has been approved',
          description: `Remember bring your car to ${
            leaseDetail.hub.address
          } on ${formatDate(
            leaseDetail.startDate
          )}. Thank you for using our service`,
        });
      }
    }
    return () => {
      if (openSocket) {
        firebase.database().off(`scanQRCode/${leaseDetail._id}`);
      }
    };
  }, []);

  const showAttr = getData(leaseDetail);

  const openListenner = () => {
    setOpenSocket(true);
    changeTransactionStatus(leaseDetail._id, WAITING_FOR_SCAN);
    firebase
      .database()
      .ref(`scanQRCode/${leaseDetail._id}`)
      .on('value', snapShot => {
        switch (snapShot.val().status) {
          // employee staring to scan the QR Code
          case WAITING_FOR_CONFIRM:
            setQrCodeModalVisible(false);
            setPopUpData(dispatch)({
              title: 'Scanning successfully',
              description: 'Please wait for the staff to confirm',
              acceptOnly: true,
            });
            break;
          // employee press confirm to receive car
          case COMPLETED: {
            setQrCodeModalVisible(false);
            setPopUpData(dispatch)({
              popupType: 'success',
              title: 'Success',
              description:
                'You has been placing your car at the hub successfully! Thank you for using service',
              onConfirm() {
                getLeaseList(dispatch)();
                navigation.pop();
              },
            });

            break;
          }

          // don't know :))
          case WAITING_FOR_USER_CONFIRM: {
            setQrCodeModalVisible(false);
            setConfirmPopupVisible(true);
            break;
          }
          // employee press cancel receive car!
          case CANCEL: {
            setQrCodeModalVisible(false);
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Transaction denied!',
              description:
                'Your car has been denied. Please try again or cancel your leasing',
            });
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
    confirmTransaction(dispatch)(
      { id: leaseDetail._id, type: 'lease' },
      {
        onSuccess() {
          getLeaseList(dispatch)();
          navigation.pop();
        },
      }
    );
  };

  const onCancelTransaction = () => {
    changeTransactionStatus(leaseDetail._id, CANCEL);
    setConfirmPopupVisible(false);
  };

  const generateValue = () => {
    setValueForQR(JSON.stringify(getTransactionValue(leaseDetail)));
    if (!qrCodeModalVisible) {
      setQrCodeModalVisible(true);
    }
  };

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
    updateLeaseStatus(dispatch)({
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
    generateValue();
    openListenner();
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
    const label = getButtonData(leaseDetail);
    if (label) {
      return (
        <Button
          label={label}
          onPress={handleRequestAction}
          style={styles.button}
        />
      );
    }
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
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginBottom: scaleVer(16) }}
        onPress={() =>
          navigation.navigate('TimeLineScreen', { id: leaseDetail._id })
        }
      >
        <Text style={[textStyle.bodyTextBold, { color: colors.successLight }]}>
          Time line
        </Text>
      </TouchableOpacity>
      {renderButton()}

      {/* <ConfirmPopup
        title="CONFIRM"
        description="Would you like to request returning your car?"
        modalVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onConfirm={handleConfirmRequest}
      /> */}
      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={onCloseQrCodeModal}
        setGenerateNewQR={generateValue}
      />
      {/* <ConfirmPopup
        title="Successfully"
        description="Transaction success"
        modalVisible={popupVisible}
        onClose={() => handleConfirmPopup}
        onConfirm={() => handleConfirmPopup}
      /> */}
      {/* <ConfirmPopup
        title="Confirm take car?"
        description="Are you sure to confirm take your car?"
        modalVisible={confirmPopupVisibie}
        onDecline={onCancelTransaction}
        onConfirm={onConfirmReceiveCar}
        onClose={() => setConfirmPopupVisible(false)}
      /> */}
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

export default LeaseHistoryItemDetailScreen;
