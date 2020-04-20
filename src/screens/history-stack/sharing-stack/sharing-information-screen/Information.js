import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SharingType, RentDetailType, NavigationType } from 'types';
import { formatDate } from 'Utils/date';
import { ListItem, Button } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import colors from 'Constants/colors';
import {
  setPopUpData,
  cancelPopup,
  cancelSharing,
  getRentalList,
} from '@redux/actions';

type PropTypes = { navigation: NavigationType };

const Information = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const rentDetail: RentDetailType = useSelector(state =>
    state.rental.data.rentals.find(item => item._id === state.rental.selectedId)
  );

  const sharingInformation: SharingType = useSelector(
    state => state.sharing.lastestSharing
  );

  const data = [
    {
      label: 'Car',
      value: rentDetail.carModel.name,
    },
    {
      label: 'From',
      value: sharingInformation.fromDate
        ? formatDate(sharingInformation.fromDate)
        : '',
    },
    {
      label: 'To',
      value: sharingInformation.toDate
        ? formatDate(sharingInformation.toDate)
        : '',
    },
    {
      label: 'Sharing price',
      value: sharingInformation.price ? sharingInformation.price : '',
    },
    {
      label: 'Address',
      value: sharingInformation.address ? sharingInformation.address : '',
    },
  ];

  const handleRequestCancelSharing = () => {
    setPopUpData(dispatch)({
      title: 'Cancel sharing request',
      description: 'Are you sure to cancel this sharing request?',
      onConfirm() {
        cancelPopup(dispatch);
        cancelSharing(dispatch)(rentDetail._id, {
          onSuccess() {
            setPopUpData(dispatch)({
              popupType: 'success',
              title: 'Successfully',
              description: 'Successfully cancel your sharing request',
              onConfirm() {
                cancelPopup(dispatch);
                navigation.pop();
                getRentalList(dispatch)();
              },
            });
          },
          onFailure() {
            setPopUpData(dispatch)({
              popupType: 'error',
              title: 'Error',
              description:
                'There was some errors while cancel your sharing. Please try again!',
            });
          },
        });
      },
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Sharing information</Text>
        {data.map((item, index) => (
          <ListItem
            label={item.label}
            type="detail"
            showSeparator={index !== data.length - 1}
            detail={item.value}
            key={index}
            pressable={false}
          />
        ))}
      </View>
      <Button
        label="Cancel sharing"
        colorStart={colors.errorLight}
        colorEnd={colors.error}
        style={{ marginBottom: scaleVer(12) }}
        onPress={handleRequestCancelSharing}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    ...textStyle.widgetItem,
    textAlign: 'center',
    marginVertical: scaleVer(12),
  },
});

export default Information;
