import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { NavigationType, UserType } from 'types';
import firebase from 'react-native-firebase';
import { processNotificationInfo } from 'services/notification';

type PropTypes = {
  navigation: NavigationType,
  user: UserType,
  screenProps: {
    notification: {
      action: String,
      screenName: String,
      selectedId: String,
    },
  },
};

const AuthScreen = ({ navigation, user }: PropTypes) => {
  const dispatch = useDispatch();
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
    if (user && user.token) {
      const notification = await checkNotification();
      if (notification) {
        processNotificationInfo({
          navigate: navigation.navigate,
          notification,
          dispatch,
        });
      } else {
        navigation.navigate('MainApp');
      }
    } else {
      navigation.navigate('SignInStack');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating />
    </View>
  );
};

async function checkNotification() {
  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    const { notification } = notificationOpen;
    return notification;
  }
}

export default connect(state => ({ user: state.user }), {})(AuthScreen);
