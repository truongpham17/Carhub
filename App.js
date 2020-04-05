import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import { createNotificationChannel } from './src/services/notification';
import Navigation from './src/screens/Navigation';
import store, { persistor } from './src/@redux/store';

class App extends React.Component {
  async componentDidMount() {
    this.removeNotificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        createNotificationChannel();
        firebase
          .notifications()
          .displayNotification(
            notification.android
              .setPriority(firebase.notifications.Android.Priority.Max)
              .android.setChannelId('notification')
          );
      });

    this.removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // Get the action triggered by the notification being opened
        const { action } = notificationOpen;
        // Get information about the notification that was opened
        const { notification } = notificationOpen;
      });
  }

  componentWillUnmount() {
    this.removeNotificationListener();
    this.removeNotificationListener();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
