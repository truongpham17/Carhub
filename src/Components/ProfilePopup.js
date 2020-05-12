import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';
import { Icon } from 'react-native-elements';
import colors from 'Constants/colors';
import { openSmsUrl } from 'Utils/common';
import Avatar from './Avatar';
import ListItem from './ListItem';
import Button from './Button';

type PropTypes = {
  description: {
    fullName: String,
    avatar: String,
    phone: String,
    email: String,
  },
  onConfirm: () => void,
};

const ProfilePopup = ({ description, onConfirm }: PropTypes) => (
  <>
    <Avatar uri={description.avatar} />
    <Text style={textStyle.widgetItem}>{description.fullName}</Text>
    <ListItem
      type="detail"
      label="Email"
      detail={description.email}
      showSeparator
      containerStyle={{ marginTop: scaleVer(24) }}
    />
    <ListItem type="detail" label="Phone" detail={description.phone} />
    <View style={styles.action}>
      <Icon
        name="phone"
        type="feather"
        raised
        reverse
        color={colors.dark40}
        onPress={() => {
          Linking.openURL(`tel:${description.phone}`);
        }}
        // containerStyle={{ backgroundColor: 'red' }}
      />
      <Icon
        name="message-square"
        type="feather"
        raised
        color={colors.dark40}
        reverse
        onPress={() => openSmsUrl(description.phone)}
      />
      <Icon
        name="mail"
        type="antdesign"
        raised
        color={colors.dark40}
        reverse
        onPress={() => Linking.openURL(`mailto:${description.email}`)}
      />
    </View>
    <Button
      label="Close"
      onPress={onConfirm}
      gradient={false}
      style={{ backgroundColor: colors.tintColor }}
    />
  </>
);

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginBottom: scaleVer(24),
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
});

export default ProfilePopup;
