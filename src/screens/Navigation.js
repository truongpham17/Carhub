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

const TestNavigator = createStackNavigator(
  {
    // SelectCarScreen,
    TestScreen,
    AddTestScreen,
    UpdateTestScreen,
  },
  {
    headerMode: 'none',
  }
);

const App = createAppContainer(TestNavigator);
export default App;
