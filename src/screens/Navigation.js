import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import { Tabbar } from 'Components';
import { TestScreen } from './test';
import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './select-car-screen/SelectCarScreen';
import RentHistoryScreen from './rent-history-screen/RentHistoryScreen';
import HostScreen from './host-screen/HostScreen';
import HostReviewScreen from './host-review-screen/HostReviewScreen';
import HostHubScreen from './host-hub-screen/HostHubScreen';
import HostListCarScreen from './host-list-car-screen/HostListCarScreen';
import RentalCarDetailScreen from './rental-car-detail-screen/RentalCarDetailScreen';
import AuthScreen from './auth-screen/AuthScreen';
import SignInScreen from './sign-in-screen/SignInScreen';

const RentalStack = createStackNavigator(
  {
    SearchCarScreen,
    SelectLocationScreen,
    SelectCarScreen,
    SelectMapScreen,
    RentalCarDetailScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SearchCarScreen',
  }
);

const LeaseStack = createStackNavigator(
  {
    HostScreen,
    HostReviewScreen,
    HostHubScreen,
    HostListCarScreen,
    SelectMapScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'HostScreen',
  }
);
const HistoryStack = createStackNavigator(
  {
    RentHistoryScreen,
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
  },
  {
    tabBarComponent: Tabbar,
    initialRouteName: 'LeaseStack',
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
    initialRouteName: 'AuthScreen',
  }
);

const App = createAppContainer(AppNavigation);
export default App;
