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
import RentalCarDetailScreen from './rental-car-detail-screen/RentalCarDetailScreen';
import SearchCarScreen from './search-car-screen/SearchCarScreen';
import SelectLocationScreen from './select-location-screen/SelectLocationScreen';
import SelectMapScreen from './select-map-screen/SelectMapScreen';
import SelectCarScreen from './select-car-screen/SelectCarScreen';
import BookList from './book-list/BookList';
import AddBook from './book-list/AddBook';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    // RentHistoryScreen,
    // RentHistoryItemDetailScreen,
    // TestScreen,
    // BookScreen,
    // AddBookScreen,
    // SelectCarScreen,
    // SelectLocationScreen,
    // SearchCarScreen,
    // SelectMapScreen,
    RentalCarDetailScreen,
    BookList,

    AddBook,
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
