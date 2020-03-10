import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';

import { connect } from 'react-redux';

import { NavigationType, UserType } from 'types';

type PropTypes = {
  navigation: NavigationType,
  user: UserType,
};

const AuthScreen = ({ navigation, user }: PropTypes) => {
  useEffect(() => {
    if (user && user.token) {
      navigation.navigate('MainApp');
    }
    navigation.navigate('AuthStack');
  }, []);

  return <ViewContainer />;
};

export default connect(state => ({ user: state.user }), {})(AuthScreen);
