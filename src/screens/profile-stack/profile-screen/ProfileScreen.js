import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, Button, Avatar, ListItem } from 'Components';

import { connect, useDispatch, useSelector } from 'react-redux';

import { NavigationType, UserType } from 'types';
import { signOut, setPopUpData, cancelPopup } from '@redux/actions';
import { textStyle } from 'Constants/textStyles';
import { scaleVer } from 'Constants/dimensions';

type PropTypes = {
  navigation: NavigationType,
};

const ProfileScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const user: UserType = useSelector(state => state.user);
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer title="Profile" style={{ alignItems: 'center' }}>
      <Avatar
        uri={user.avatar}
        style={{ marginTop: scaleVer(48), marginBottom: scaleVer(12) }}
      />
      <Text style={textStyle.widgetItem}>{user.fullName}</Text>
      <ListItem
        label="Information"
        nextIcon="next"
        showSeparator
        containerStyle={{ marginTop: scaleVer(36) }}
      />

      <ListItem label="Setting" nextIcon="next" showSeparator />
      <ListItem label="About us" nextIcon="next" showSeparator />
      <ListItem
        label="Sign out"
        nextIcon="next"
        showSeparator
        pressable
        onItemPress={() => {
          setPopUpData(dispatch)({
            popupType: 'confirm',
            title: 'Log out',
            description: 'Are you sure to log out',
            onConfirm() {
              cancelPopup(dispatch);
              signOut(dispatch);
              navigation.navigate('AuthScreen');
            },
          });
        }}
      />
    </ViewContainer>
  );
};

export default ProfileScreen;
