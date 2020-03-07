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
import HostScreen from './host-screen/HostScreen';
import HostReviewScreen from './host-review-screen/HostReviewScreen';
import HostHubScreen from './host-hub-screen/HostHubScreen';
import HostListCarScreen from './host-list-car-screen/HostListCarScreen';

const RentalStack = createStackNavigator(
  {
    SearchCarScreen,
    SelectLocationScreen,
    SelectCarScreen,
    SelectMapScreen,
  },
  {
    headerMode: 'none',
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
    SelectCarScreen,
  },
  {
    headerMode: 'none',
  }
);
const ProfileStack = createStackNavigator(
  {
    SelectCarScreen,
  },
  {
    headerMode: 'none',
  }
);

const TabNavigation = createBottomTabNavigator(
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

const App = createAppContainer(TabNavigation);
export default App;
