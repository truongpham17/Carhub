import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { TestScreen } from './test';
import RentHistoryItemDetailScreen from './rent-history-item-detail-screen/RentHistoryItemDetailScreen';
import HostScreen from './host-screen/HostScreen';
import HostListCarScreen from './host-list-car-screen/HostListCarScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    HostScreen,
    HostListCarScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
