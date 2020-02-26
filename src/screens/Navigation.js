import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    // BookScreen,
    // AddBookScreen,
    // SearchCarScreen,
    SelectLocationScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
