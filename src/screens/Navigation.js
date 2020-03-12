import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  // createDrawerNavigator,
} from 'react-navigation';
import { Tabbar } from 'Components';
import { TestScreen } from './test';
import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './select-car-screen/SelectCarScreen';
// import RequestListScreen from './request-list-screen/RequestListScreen';
// import RequestDetailScreen from './request-detail-screen/RequestDetailScreen';
import RentalCarDetailScreen from './rental-car-detail-screen/RentalCarDetailScreen';
import AuthScreen from './auth-screen/AuthScreen';
import SignInScreen from './sign-in-screen/SignInScreen';
import RentBookingReview from './rent-booking-review/RentBookingReview';
import InfoExplainScreen from './info-explain-screen/InfoExplainScreen';
import LicenseScreen from './license-screen/LicenseScreen';
// import ScanQrCodeScreen from './scan-qr-code-screen/ScanQrCodeScreen';
import HistoryScreen from './history-screen/HistoryScreen';
import SuccessBookingRental from './success-booking-rental/SuccessBookingRental';
import RentHistoryItemDetailScreen from './rent-history-item-detail-screen/RentHistoryItemDetailScreen';

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
  },
  {
    headerMode: 'none',
    // initialRouteName: 'SuccessBookingDetail',
  }
);

const LeaseStack = createStackNavigator(
  {
    TestScreen,
  },
  {
    headerMode: 'none',
  }
);
const HistoryStack = createStackNavigator(
  {
    HistoryScreen,
    RentHistoryItemDetailScreen,
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
    initialRouteName: 'RentalStack',
  }
);

const AuthStack = createStackNavigator({
  SignInScreen,
});

const AppNavigation = createSwitchNavigator(
  {
    AuthScreen,
    AuthStack,
    MainApp,
  },
  {
    // initialRouteName: 'MainApp',
  }
);

// const scanScreen = createStackNavigator(
//   {
//     HistoryScreen,
//   },
//   {
//     headerMode: 'none',
//   }
// );

const App = createAppContainer(AppNavigation);
export default App;
