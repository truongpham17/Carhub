import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ViewContainer, ListItem, Button, QRCodeGenModal } from 'Components';
import { NavigationType, LeaseDetailType } from 'types';
import { useSelector, useDispatch } from 'react-redux';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { updateLeaseStatus } from '@redux/actions/lease';
import { WAITING_FOR_SCAN } from 'Constants/status';
import { changeTransactionStatus } from 'Utils/database';
import { setPopUpData } from '@redux/actions';
import { formatDate } from 'Utils/date';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import {
  getData,
  getButtonData,
  getTransactionValue,
  handleRequestReceive,
  handleCancelRequest,
  listenFirebaseStatus,
} from './utils';

type PropTypes = {
  navigation: NavigationType,
  // getLease: () => void,
};

const LeaseHistoryItemDetailScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const leases: [LeaseDetailType] = useSelector(
    state => state.lease.data.leases
  );

  const loading = useSelector(state => state.lease.loading);
  const [valueForQR, setValueForQR] = useState('');
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
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
  }, []);

  const showAttr = getData(leaseDetail);

  const openListenner = () => {
    changeTransactionStatus(leaseDetail._id, WAITING_FOR_SCAN);
    listenFirebaseStatus({
      lease: leaseDetail,
      navigation,
      onCloseModal() {
        setQrCodeModalVisible(false);
      },
      dispatch,
    });
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

  const onRequestTransaction = () => {
    generateValue();
    openListenner();
  };

  const handleRequestAction = () => {
    switch (leaseDetail.status) {
      case 'AVAILABLE':
        return handleRequestReceive(leaseDetail, dispatch);
      case 'WAIT_TO_RETURN':
        return onRequestTransaction();
      case 'ACCEPTED':
        return onRequestTransaction();
      case 'PENDING':
        return handleCancelRequest();
      default:
        return null;
    }
  };

  const renderButton = () => {
    const label = getButtonData(leaseDetail);
    return (
      <>
        {label && (
          <Button
            onPress={handleRequestAction}
            style={styles.button}
            {...label}
          />
        )}
      </>
    );
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Detail"
      onBackPress={onBackPress}
      scrollable
      loading={loading}
    >
      <View style={{ flex: 1 }}>
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
          <Text
            style={[textStyle.bodyTextBold, { color: colors.successLight }]}
          >
            Time line
          </Text>
        </TouchableOpacity>
      </View>

      {renderButton()}

      <QRCodeGenModal
        valueForQR={valueForQR}
        visible={qrCodeModalVisible}
        onClose={onCloseQrCodeModal}
        setGenerateNewQR={generateValue}
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
    marginBottom: scaleVer(12),
  },
});

export default LeaseHistoryItemDetailScreen;
