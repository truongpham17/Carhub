import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  // createDrawerNavigator,
} from 'react-navigation';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Tabbar, Popup } from 'Components';
import { useSelector, useDispatch } from 'react-redux';
import { cancelPopup } from '@redux/actions/app';
import {
  processNotificationInfo,
  createNotificationChannel,
} from 'services/notification';
import firebase from 'react-native-firebase';
import { TestScreen } from './test';
import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './select-car-screen/SelectCarScreen';
// import RequestListScreen from './request-list-screen/RequestListScreen';
// import RequestDetailScreen from './request-detail-screen/RequestDetailScreen';
import HostScreen from './host-screen/HostScreen';
import HostReviewScreen from './host-review-screen/HostReviewScreen';
import HostHubScreen from './host-hub-screen/HostHubScreen';
import HostListCarScreen from './host-list-car-screen/HostListCarScreen';
import CarItem from './host-list-car-screen/CarItem';
import HostScanCameraScreen from './host-scan-camera-screen/HostScanCameraScreen';
import RentalCarDetailScreen from './rental-car-detail-screen/RentalCarDetailScreen';
import AuthScreen from './auth-screen/AuthScreen';
import SignInScreen from './sign-in-screen/SignInScreen';
import RentBookingReview from './rent-booking-review/RentBookingReview';
import InfoExplainScreen from './info-explain-screen/InfoExplainScreen';
import LicenseScreen from './license-screen/LicenseScreen';
import HistoryScreen from './history-screen/HistoryScreen';
import SuccessBookingRental from './success-booking-rental/SuccessBookingRental';
import RentHistoryItemDetailScreen from './rent-history-item-detail-screen/RentHistoryItemDetailScreen';
import LeaseHistoryItemDetailScreen from './lease-history-item-detail-screen/LeaseHistoryItemDetailScreen';
import SelectSharingCarScreen from './select-sharing-car-screen/SelectSharingCarScreen';
import TimeLineScreen from './time-line-screen/TimeLineScreen';
import SharingDetailScreen from './sharing-detail-screen/SharingDetailScreen';
import ViewSharingInformation from './view-sharing-information/ViewSharingInformation';
import RentSharingRequestScreen from './rent-sharing-car-request/RentSharingRequestScreen';
import ScanScreen from './scan-screen/ScanScreen';
import NavigationService from './NavigationService';

const RentalStack = createStackNavigator(
  {
    SearchCarScreen,
    SelectLocationScreen,
    SelectCarScreen,
    SelectMapScreen,
    RentalCarDetailScreen,
    RentBookingReview,
    InfoExplainScreen,
    LicenseScreen,
    SuccessBookingRental,
    SelectSharingCarScreen,
    ViewSharingInformation,
  },
  {
    headerMode: 'none',
    // initialRouteName: 'SuccessBookingDetail',
  }
);

const LeaseStack = createStackNavigator(
  {
    HostScreen,
    HostReviewScreen,
    HostHubScreen,
    HostListCarScreen,
    SelectMapScreen,
    HostScanCameraScreen,
    CarItem,
  },
  {
    headerMode: 'none',
    // initialRouteName: 'HostScreen',
  }
);
const HistoryStack = createStackNavigator(
  {
    HistoryScreen,
    RentHistoryItemDetailScreen,
    SharingDetailScreen,
    LeaseHistoryItemDetailScreen,
    SelectMapScreen,
    SelectLocationScreen,
    TimeLineScreen,
    RentSharingRequestScreen,
    ScanScreen,
  },
  {
    headerMode: 'none',
  }
);
const ProfileStack = createStackNavigator(
  {
    TestScreen,
  },
  {
    headerMode: 'none',
  }
);

const MainApp = createBottomTabNavigator(
  {
    RentalStack,
    LeaseStack,
    HistoryStack,
    ProfileStack,
    // RequestDetailScreen,
    // RequestListScreen,
  },
  {
    tabBarComponent: Tabbar,
    // initialRouteName: 'LeaseStack',
  }
);

const SignInStack = createStackNavigator(
  {
    SignInScreen,
  },
  {
    headerMode: 'none',
  }
);

const AppNavigation = createSwitchNavigator(
  {
    AuthScreen,
    SignInStack,
    MainApp,
  },
  {
    // initialRouteName: 'MainApp',
  }
);

const App = createAppContainer(AppNavigation);

const AppContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const removeNotificationListener = firebase
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

    const removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { notification } = notificationOpen;

        processNotificationInfo({
          notification,
          dispatch,
          navigate: NavigationService.navigate,
        });
      });
    return () => {
      removeNotificationListener();
      removeNotificationOpenedListener();
    };
  }, []);

  const { popup } = useSelector(state => state.app);

  const onClosePopup = () => {
    cancelPopup(dispatch);
    if (typeof popup.onClose === 'function') {
      popup.onClose();
    }
  };

  const onConfirmPopup = data => {
    cancelPopup(dispatch);
    if (typeof popup.onConfirm === 'function') {
      popup.onConfirm(data);
    }
  };
  const onDeclinePopup = data => {
    cancelPopup(dispatch);
    if (typeof popup.onDecline === 'function') {
      popup.onDecline(data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <App
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <Popup
        {...popup}
        onClose={onClosePopup}
        onConfirm={onConfirmPopup}
        onDecline={onDeclinePopup}
      />
    </View>
  );
};

export default AppContainer;
