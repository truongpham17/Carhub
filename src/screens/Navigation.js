import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

// import { TestScreen } from './test';
import TestScreen from './testapi-screen/testScreen';
import AddTestScreen from './add-test-screen/AddTestScreen';
import UpdateTestScreen from './update-test-screen/UpdateTestScreen';

import BookScreen from './book-screen/BookScreen';
import AddBookScreen from './add-book-screen/AddBookScreen';

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
<<<<<<< HEAD
    // TestScreen,
    BookScreen,
    AddBookScreen,
=======
    TestScreen,
    AddTestScreen,
    UpdateTestScreen,
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
