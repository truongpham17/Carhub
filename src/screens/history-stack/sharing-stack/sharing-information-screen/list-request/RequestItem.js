import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RentalRequestType } from 'types';

import { Avatar } from 'react-native-elements';
import { ListItem, Button } from 'Components';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { useDispatch } from 'react-redux';
import { setPopUpData } from '@redux/actions';
import {
  formatDate,
  formatDayLabel,
  substractDate,
  formatPrice,
} from 'Utils/date';

type PropTypes = {
  onAcceptRequest: () => void,
  onDeclineRequest: () => void,
  data: RentalRequestType,
  onConfirm: () => void,
  isNew?: boolean,
};

const RequestItem = ({
  data,
  onAcceptRequest,
  onConfirm,
  onDeclineRequest,
  isNew = false,
}: PropTypes) => {
  console.log('data at request item:', data);
  const dispatch = useDispatch();
  const daydiffs = substractDate(data.sharing.fromDate, data.sharing.toDate);
  const attrs = [
    {
      label: 'Name',
      pressable: true,
      detail: data.customer.fullName,
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'profile',
          description: data.customer,
        });
      },
      nextIcon: 'next',
    },
    { label: 'From date', detail: formatDate(data.sharing.fromDate) },
    { label: 'To date', detail: formatDate(data.sharing.toDate) },
    { label: 'Duration', detail: formatDayLabel(daydiffs) },
    { label: 'Total earn', detail: formatPrice(daydiffs * data.sharing.price) },
    { label: 'Message', detail: data.message },
  ];
  return (
    <View
      style={[
        styles.itemContainer,
        isNew ? { borderColor: colors.errorLight } : {},
      ]}
    >
      {attrs.map((item, index) => (
        <ListItem
          type="detail"
          showSeparator={index !== attrs.length - 1}
          {...item}
        />
      ))}

      {data.status === 'ACCEPTED' && (
        <Button label="Confirm transfer car" onPress={onConfirm} />
      )}

      {data.status === 'PENDING' && (
        <View style={styles.action}>
          <Button
            style={{ width: 120, height: 36, borderRadius: 18 }}
            colorStart={colors.errorLight}
            colorEnd={colors.error}
            label="Decline"
            onPress={() => onDeclineRequest(data._id)}
          />
          <Button
            label="Accept"
            onPress={() => onAcceptRequest(data._id)}
            style={{ width: 120, height: 36, borderRadius: 18 }}
          />
        </View>
      )}
    </View>
  );
};

export default RequestItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: scaleVer(8),
    ...shadowStyle.ELEVATION_3,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.dark90,
    paddingHorizontal: scaleHor(12),
    paddingVertical: scaleVer(16),
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: scaleVer(12),
  },
  button: {
    paddingHorizontal: scaleHor(24),
    alignSelf: 'stretch',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleVer(16),
    alignSelf: 'stretch',
  },
});
