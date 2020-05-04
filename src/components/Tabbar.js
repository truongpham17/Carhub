import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleVer } from 'Constants/dimensions';

// navigation.state.routeName
const TAB_NAME = [
  'AppStack',
  'HistoryStack',
  'ProfileStack',
  // 'NotificationStack',
];

const INITIAL_SCREEN = ['LandingPage', 'HistoryScreen', 'ProfileScreen'];
const routeConfig = [
  {
    icon: 'home',
    title: 'Home',
  },

  {
    icon: 'menu',
    title: 'History',
  },
  {
    icon: 'user',
    title: 'Profile',
  },
  // {
  //   icon: 'shopping-cart',
  //   title: 'Notification',
  // },
];

class TabBar extends React.PureComponent {
  renderTabIcon = ({ icon, title, onPress, color, type = 'feather' }) => (
    <TouchableWithoutFeedback onPress={onPress} key={title}>
      <View>
        <Icon name={icon} type={type} size={20} color={color} />
        <Text style={[textStyle.bodyText, { color }]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { navigation } = this.props;
    const { index } = navigation.state;
    const colorArr = TAB_NAME.map((item, idx) =>
      idx === index ? colors.primary : colors.dark60
    );
    return (
      // <View style={{ backgroundColor: colors.primaryLight }}>
      <SafeAreaView
        style={{
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.dark80,
          // marginTop: scaleVer(12),
        }}
      >
        <View style={styles.containerStyle}>
          {routeConfig.map((item, idx) =>
            this.renderTabIcon({
              ...item,
              onPress: () => navigation.navigate(TAB_NAME[idx]),
              color: colorArr[idx],
            })
          )}
        </View>
      </SafeAreaView>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 6,
    paddingTop: 12,
    // borderTopRightRadius: 24,
    // borderTopLeftRadius: 24,
    overflow: 'hidden',
    elevation: 12,
  },
});

export default withNavigation(TabBar);
