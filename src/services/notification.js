import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';
import { getLeaseList, getRentalList, setRentDetailId } from '@redux/actions';

export default async (message: RemoteMessage) =>
  // handle your message

  Promise.resolve();

export function createNotificationChannel() {
  const channel = new firebase.notifications.Android.Channel(
    'notification',
    'Common notification',
    firebase.notifications.Android.Importance.Max
  ).setDescription('This channel using for notifications');

  firebase.notifications().android.createChannel(channel);
}

export function getNotificationData(data) {
  if (data) {
    const { action } = data;
    if (action === 'NAVIGATE') {
      if (data.screenName) {
        return {
          action,
          screenName: data.screenName,
          selectedId: data.selectedId,
        };
      }
    }
  }
}

export function processNotificationInfo({ notification, navigate, dispatch }) {
  const { data } = notification;
  if (data) {
    if (data.action === 'NAVIGATE') {
      switch (data.screenName) {
        case 'LeaseHistoryItemDetailScreen': {
          getLeaseList(dispatch)({
            onSuccess() {
              navigate('LeaseHistoryItemDetailScreen', {
                selectedId: data.selectedId,
                showStatusPopup: true,
              });
            },
            onFailure() {
              navigate('MainApp');
            },
          });
          break;
        }
        case 'SharingInformationScreen': {
          getRentalList(dispatch)({
            onSuccess() {
              setRentDetailId(dispatch)(data.selectedId);
              navigate('SharingInformationScreen', {
                newId: data.newId,
              });
            },
          });
          break;
        }
        default:
          navigate('MainApp');
      }
    }
  } else {
    navigate('MainApp');
  }
}
