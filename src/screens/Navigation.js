import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import BookList from './booklist/BookList';
import AddBook from './booklist/AddBook';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    // BookScreen,
    // AddBookScreen,
    // SearchCarScreen,
    BookList,
    AddBook,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
