import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer, Button } from 'Components';

import { connect, useDispatch } from 'react-redux';

import { NavigationType } from 'types';
import { signOut } from '@redux/actions';

type PropTypes = {
  navigation: NavigationType,
};

const ProfileScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const onBackPress = () => {
    navigation.pop();
  };

  return (
    <ViewContainer title="Profile">
      <Button
        label="Sign out"
        onPress={() => {
          signOut(dispatch);

          navigation.navigate('AuthScreen');
        }}
      />
    </ViewContainer>
  );
};

export default ProfileScreen;
