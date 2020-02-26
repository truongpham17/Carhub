import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { TestScreen } from './test';
import RentHistoryItemDetailScreen from './rent-history-item-detail-screen/RentHistoryItemDetailScreen';
import RentHistoryScreen from './rent-history-screen/RentHistoryScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    RentHistoryScreen,
    RentHistoryItemDetailScreen,
    // TestScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
