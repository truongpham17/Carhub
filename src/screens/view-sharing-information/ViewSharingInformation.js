import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { ViewContainer, ListItem, Button, ThankYouPopup } from 'Components';
import { NavigationType, SharingType } from 'types';
import { scaleVer } from 'Constants/dimensions';
import { useSelector, useDispatch } from 'react-redux';
import { subtractDate } from 'Utils/common';
import { sendSharingRequest } from '@redux/actions/sharing';
import { formatDate } from 'Utils/date';
import SharingExplainModel from './ShareExplainModal';

type PropsType = {
  navigation: NavigationType,
};

const ViewSharingInformation = ({ navigation }: PropsType) => {
  const dispatch = useDispatch();

  const sharingList: [SharingType] = useSelector(state => state.sharing.data);
  const [successDialog, setSuccessDialog] = useState(false);
  const { startDate, endDate } = useSelector(state => state.car.rentalSearch);
  const loading = useSelector(state => state.sharing.isLoading);
  const [modalVisible, setModalVisible] = useState(true);

  const user = useSelector(state => state.user);

  const { selectedId } = navigation.state.params;

  const sharing = sharingList.find(item => item._id === selectedId) || {};

  // const changesharing = sharing => setsharing(sharing);

  const handleSendRequest = () => {
    sendSharingRequest(dispatch)(
      {
        sharing: sharing._id,
        customer: user._id,
        fromDate: startDate.toISOString(),
        toDate: endDate.toISOString(),
      },
      {
        onSuccess() {
          setSuccessDialog(true);
        },
      }
    );
  };

  const daysdiff = Math.abs(subtractDate(startDate, endDate));

  const data = {
    rental: [
      { label: 'Car name', value: sharing.rental.carModel.name },
      { label: 'Car type', value: sharing.rental.carModel.type },
      { label: 'Seats', value: sharing.rental.carModel.numberOfSeat },
      { label: 'Start Date', value: formatDate(startDate) },
      { label: 'End Date', value: formatDate(endDate) },
      { label: 'Price per day', value: sharing.price },
      { label: 'Total', value: daysdiff * Number(sharing.price) },
      { label: 'Location', value: sharing.address },
      {
        label: 'Car return address',
        value: sharing.rental.pickoffHub.address,
      },
      {
        label: 'Sharing owner',
        value: sharing.rental.customer.fullName,
        pressable: true,
        onItemPress: () => {
          console.log('move to user profile screen');
        },
      },
    ],
  };

  return (
    <ViewContainer
      haveBackHeader
      title="Sharing Detail"
      scrollable
      onBackPress={() => navigation.pop()}
      loading={loading}
    >
      <View style={{ flex: 1 }}>
        {data.rental.map((item, index) => (
          <ListItem
            key={index.toString()}
            label={item.label}
            detail={item.value}
            type="detail"
            pressable={item.pressable}
            onItemPress={item.onItemPress}
            showSeparator
          />
        ))}

        <ListItem
          key="dayDiff"
          label="Duration"
          detail={daysdiff}
          type="detail"
          showSeparator
        />
        <ListItem
          key="total"
          label="Total"
          detail={daysdiff * sharing.price}
          type="detail"
        />
      </View>
      <Button
        label="Send request"
        onPress={handleSendRequest}
        style={{ marginBottom: scaleVer(12) }}
      />
      <SharingExplainModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSeeDetail={() => setModalVisible(false)}
        hubAddress={sharing.rental.pickoffHub.address}
        returnTime={formatDate(sharing.rental.endDate)}
        onPressBack={() => {
          setModalVisible(false);
          navigation.pop();
        }}
      />
      <ThankYouPopup
        msg="Success"
        detail="Your request has been sent successfully. Please wait for response!"
        onClose={() => setSuccessDialog(false)}
        onConfirm={() => {
          setSuccessDialog(false);
          navigation.pop();
        }}
        visible={successDialog}
      />
    </ViewContainer>
  );
};

export default ViewSharingInformation;
