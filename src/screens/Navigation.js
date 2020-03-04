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
    SelectCarScreen,
  },
  {
    headerMode: 'none',
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
    initialRouteName: 'RentalStack',
  }
);

const App = createAppContainer(TabNavigation);
export default App;
