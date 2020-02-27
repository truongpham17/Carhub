import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './select-car-screen/SelectCarScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    // BookScreen,
    // AddBookScreen,
    SelectCarScreen,
    SelectLocationScreen,

    SearchCarScreen,
    SelectMapScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
