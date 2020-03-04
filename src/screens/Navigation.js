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
import HostHubScreen from './host-hub-screen/HostHubScreen';
import HostReviewScreen from './host-review-screen/HostReviewScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    HostScreen,
    HostListCarScreen,
    HostHubScreen,
    HostReviewScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
