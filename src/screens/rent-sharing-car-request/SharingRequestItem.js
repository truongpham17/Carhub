import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RentalRequestType } from 'types';

import { Avatar } from 'react-native-elements';
import { ListItem, Button } from 'Components';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { scaleVer, scaleHor } from 'Constants/dimensions';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  onAcceptRequest: () => void,
  onDeclineRequest: () => void,
  data: RentalRequestType,
  onConfirm: () => void,
};

const SharingRequestItem = ({
  data,
  onAcceptRequest,
  onConfirm,
}: PropTypes) => (
  <View style={styles.itemContainer}>
    <View style={styles.infoContainer}>
      <Avatar size="large" source={{ uri: data.customer.avatar }} rounded />
      <ListItem
        key="name"
        label="Name"
        detail={data.customer.fullName}
        type="detail"
        showSeparator
      />
      <ListItem
        key="phone"
        label="Phone"
        detail={data.customer.phone}
        type="detail"
        showSeparator
      />
      <ListItem
        key="email"
        label="Email"
        detail={data.customer.email}
        type="detail"
        showSeparator
      />
      <ListItem
        key="message"
        label="Message"
        detail={data.message || 'No message'}
        type="detail"
      />
    </View>
    {data.status === 'ACCEPTED' && (
      <Button label="Confirm transfer car" onPress={onConfirm} />
    )}

    {data.status === 'PENDING' && (
      <Button
        label="Accept"
        colorStart={colors.primaryLight}
        colorEnd={colors.primary}
        style={styles.button}
        onPress={() => onAcceptRequest(data._id)}
      />
    )}
  </View>
);

export default SharingRequestItem;

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
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: scaleVer(12),
  },
});
