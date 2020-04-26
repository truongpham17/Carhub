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
import { fromRight } from 'react-navigation-transitions';

import SearchCarScreen from './rental-stack/search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './rental-stack/select-car-screen/SelectCarScreen';
import RentalCarDetailScreen from './rental-stack/rental-car-detail-screen/RentalCarDetailScreen';
import RentBookingReview from './rental-stack/rent-booking-review/RentBookingReview';
import InfoExplainScreen from './rental-stack/info-explain-screen/InfoExplainScreen';
import LicenseScreen from './rental-stack/license-screen/LicenseScreen';
import SuccessBookingRental from './rental-stack/success-booking-rental/SuccessBookingRental';
import ViewSharingInformation from './rental-stack/view-sharing-information/ViewSharingInformation';

import HostScreen from './lease-stack/host-screen/HostScreen';
import HostReviewScreen from './lease-stack/host-review-screen/HostReviewScreen';
import HostHubScreen from './lease-stack/host-hub-screen/HostHubScreen';
import HostListCarScreen from './lease-stack/host-list-car-screen/HostListCarScreen';
import HostScanCameraScreen from './lease-stack/host-scan-camera-screen/HostScanCameraScreen';

import AuthScreen from './auth-stack/auth-screen/AuthScreen';
import SignInScreen from './auth-stack/sign-in-screen/SignInScreen';
import SignUpScreen from './auth-stack/sign-up-screen/SignUpScreen';

import HistoryScreen from './history-stack/history-screen/HistoryScreen';
import RentHistoryItemDetailScreen from './history-stack/rental-stack/rent-history-item-detail-screen/RentHistoryItemDetailScreen';
import LeaseHistoryItemDetailScreen from './history-stack/lease-stack/lease-history-item-detail-screen/LeaseHistoryItemDetailScreen';
import TimeLineScreen from './history-stack/time-line-screen/TimeLineScreen';
import SharingDetailScreen from './history-stack/rental-stack/sharing-detail-screen/SharingDetailScreen';
import ScanScreen from './history-stack/rental-stack/scan-screen/ScanScreen';

import SelectPriceScreen from './history-stack/sharing-stack/select-price-screen/SelectPriceScreen';
import SelectShareAddressScreen from './history-stack/sharing-stack/select-address-screen/SelectShareAddressScreen';
import SharingConfirmationScreen from './history-stack/sharing-stack/sharing-confirmation-screen/SharingConfirmationScreen';
import SelectTimeScreen from './history-stack/sharing-stack/select-time-screen/SelectTimeScreen';
import SharingInformationScreen from './history-stack/sharing-stack/sharing-information-screen/SharingInformationScreen';

import ProfileScreen from './profile-stack/profile-screen/ProfileScreen';
import DetailProfileScreen from './profile-stack/detail-profile-screen/DetailProfileScreen';

import NotificationScreen from './notification-screen/NotificationScreen';

import LandingPage from './landing-page/LandingPage';

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
  },
  {
    headerMode: 'none',
    // initialRouteName: 'HostScreen',
  }
);

const SharingStack = createStackNavigator(
  {
    SelectTimeScreen,
    SelectPriceScreen,
    SelectShareAddressScreen,
    SharingConfirmationScreen,
  },
  {
    initialRouteName: 'SelectTimeScreen',
    headerMode: 'none',
    transitionConfig: () => fromRight(),
  }
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen,
    DetailProfileScreen,
  },
  {
    headerMode: 'none',
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
    ScanScreen,
    SharingStack,
    SharingInformationScreen,
  },
  {
    headerMode: 'none',
  }
);

const AppStack = createStackNavigator(
  {
    LandingPage,
    RentalStack,
    LeaseStack,
    NotificationScreen,
  },
  {
    headerMode: 'none',
  }
);

const MainApp = createBottomTabNavigator(
  {
    AppStack,
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
    SignUpScreen,
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
        console.log(notification);
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
