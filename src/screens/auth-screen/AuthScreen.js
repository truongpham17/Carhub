import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';

import { connect } from 'react-redux';

import { NavigationType, UserType } from 'types';
import firebase from 'react-native-firebase';

type PropTypes = {
  navigation: NavigationType,
  user: UserType,
  screenProps: {
    notification: {
      action: String,
      screenName: String,
    },
  },
};

const AuthScreen = ({ navigation, user, screenProps }: PropTypes) => {
  useEffect(() => {
    firebase
      .messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });

    initialNotification();
  }, []);

  const initialNotification = async () => {
    const data = await checkNotification();
    console.log('notification data: ', data);

    if (data) {
      if (data.action === 'NAVIGATE') {
        return navigation.navigate(data.screenName, { ...data.screenProps });
      }
    }

    if (user && user.token) {
      navigation.navigate('MainApp');
    } else {
      navigation.navigate('SignInStack');
    }
  };

  return <ViewContainer />;
};

async function checkNotification() {
  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    const { notification } = notificationOpen;
    if (notification.data) {
      const { action } = notification.data;
      if (action === 'NAVIGATE') {
        if (notification.data.screenName) {
          return {
            action,
            screenName: notification.data.screenName,
            screenProps: notification.data.screenProps,
          };
        }
      }
    }
  }
}

export default connect(state => ({ user: state.user }), {})(AuthScreen);
