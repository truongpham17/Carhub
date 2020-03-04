import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import { Tabbar } from 'Components';

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

const RentalStack = createStackNavigator(
  {
    SearchCarScreen,
    SelectLocationScreen,
    SelectCarScreen,
    SelectMapScreen,
  },
  {
    headerMode: 'none',
  }
);

const LeaseStack = createStackNavigator(
  {
    AddBook,
  },
  {
    headerMode: 'none',
  }
);
const HistoryStack = createStackNavigator(
  {
    AddBook,
  },
  {
    headerMode: 'none',
  }
);
const ProfileStack = createStackNavigator(
  {
    AddBook,
  },
  {
    headerMode: 'none',
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    RentalStack,
    LeaseStack,
    HistoryStack,
    ProfileStack,
  },
  {
    tabBarComponent: Tabbar,
    initialRouteName: 'RentalStack',
  }
);

const App = createAppContainer(TabNavigation);
export default App;
/*

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { fromRight } from 'react-navigation-transitions';
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import {
  AuthScreen,
  OnBoarding,
  LoginScreen,
  SignUpScreen,
  SearchScreen,
  DiscoveryScreen,
  HistoryScreen,
  UserScreen,
  ShopInfoScreen,
  SearchListScreen,
  DetailServiceScreen,
  ShopFeedback,
  BookingDetailScreen,
  HistoryDetailScreen,
  SpaServices,
  Verification,
  FavoriteScreen,
  InputName,
  CardScreen,
  EditProfile,
  DirectionScreen
} from './screen';
import { TabBar, ImageSlider } from './components';
import { setPopup } from './actions';
import { POPUP_TYPE } from './constants/StringConstants';
import { Success } from './components/popup';
import { colors } from './constants/color';

const TabNavigation = createBottomTabNavigator(
  {
    DiscoveryScreen,
    HistoryScreen,
    CardScreen,
    UserScreen
  },
  {
    tabBarComponent: TabBar,
    initialRouteName: 'DiscoveryScreen'
  }
);

const Main = createStackNavigator(
  {
    TabNavigation,
    ShopInfoScreen: {
      screen: ShopInfoScreen
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    SearchListScreen,
    DetailServiceScreen: {
      screen: DetailServiceScreen
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    ShopFeedback,
    BookingDetailScreen: {
      screen: BookingDetailScreen
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    SearchScreen: {
      screen: SearchScreen
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    SpaServices: {
      screen: SpaServices
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    HistoryDetailScreen: {
      screen: HistoryDetailScreen
      // navigationOptions: {
      //   gesturesEnabled: true
      // }
    },
    EditProfile,
    DirectionScreen: {
      screen: DirectionScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'TabNavigation'
    // initialRouteName: 'SearchScreen',
    // transitionConfig: () => fromRight()
  }
);

const OnBoardingNavigation = createStackNavigator(
  {
    OnBoarding,
    FavoriteScreen
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromRight()
  }
);

const LoginNavigation = createStackNavigator(
  {
    Verification,
    LoginScreen,
    SignUpScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    transitionConfig: () => fromRight()
  }
);

const AppNavigation = createSwitchNavigator(
  {
    AuthScreen,
    LoginNavigation,
    OnBoardingNavigation,
    Main,
    InputName
  },
  {
    initialRouteName: 'AuthScreen'
    // initialRouteName: 'Main'
  }
);

const AppContent = createAppContainer(AppNavigation);

class AppContentWithHighLevelProcess extends React.Component {
  renderModal = () => {
    const { type, data, setPopup } = this.props;
    switch (type) {
      case POPUP_TYPE.success_dialog:
        return <Success />;
      case POPUP_TYPE.image_slider:
        return <ImageSlider onClose={() => setPopup({ visible: false })} data={data} />;
      case POPUP_TYPE.loading:
        return <ActivityIndicator size="small" color={colors.primaryColor} />;
      default:
        return <View />;
    }
  };
  render() {
    const { setPopup, visible } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setPopup({ visible: false })}
          style={{ margin: 0 }}
          onBackButtonPress={() => setPopup({ visible: false })}
        >
          {this.renderModal()}
        </Modal>
        <AppContent />
      </View>
    );
  }
}

const AppContentWithConnectData = connect(
  state => ({
    visible: state.popup.visible,
    type: state.popup.type,
    popupAction: state.popup.action,
    data: state.popup.data
  }),
  { setPopup }
)(AppContentWithHighLevelProcess);

export { AppContentWithConnectData };

*/
