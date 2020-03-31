import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

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
