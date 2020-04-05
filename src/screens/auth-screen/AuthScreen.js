import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContainer } from 'Components';

import { connect, useDispatch } from 'react-redux';

import { NavigationType, UserType } from 'types';
import firebase from 'react-native-firebase';
import { getLeaseList } from '@redux/actions';

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
      const data = await checkNotification();
      console.log('notification data', data);
      if (data) {
        if (data.action === 'NAVIGATE') {
          switch (data.screenName) {
            case 'LeaseHistoryItemDetailScreen': {
              getLeaseList(dispatch)({
                onSuccess() {
                  navigation.navigate('LeaseHistoryItemDetailScreen', {
                    selectedId: data.selectedId,
                    showStatusPopup: true,
                  });
                },
                onFailure() {
                  navigation.navigate('MainApp');
                },
              });
              break;
            }
            default:
              navigation.navigate('MainApp');
          }
        }
      } else {
        navigation.navigate('MainApp');
      }
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
            selectedId: notification.data.selectedId,
          };
        }
      }
    }
  }
}

export default connect(state => ({ user: state.user }), {})(AuthScreen);
