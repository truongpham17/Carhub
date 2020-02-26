import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import { TestScreen } from './test';

import BookScreen from './book-screen/BookScreen';
import AddBookScreen from './add-book-screen/AddBookScreen';
import SearchCarScreen from './search-car-screen/SearchCarScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // TestScreen,
    // BookScreen,
    // AddBookScreen,
    SearchCarScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
