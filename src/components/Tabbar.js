import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NavigationType } from 'types';

import { dimension, color, shadowStyle } from 'Constants';
import { getSvg } from 'Assets/svgs';

const { SCREEN_WIDTH } = dimension;

type PropTypes = {
  navigation: NavigationType,
  index: number,
};

const height = 58;

const routeConfig = [
  {
    icon: 'Home',
    title: 'HomeScreen',
  },
  { icon: 'AppIcon', title: 'RollCallSwitchNavigation', isCenter: true },
  {
    icon: 'Profile',
    title: 'ProfileScreen',
  },
];

class Tabbar extends React.PureComponent<PropTypes> {
  renderTabIcon = ({ icon, onPress, isCenter, isSelected, key }) => (
    <TouchableWithoutFeedback onPress={onPress} key={key}>
      <View
        style={[
          // isSelected ? { backgroundColor: '#304777' } : {},
          styles.icon,
          isCenter ? styles.center : {},
          isSelected && isCenter ? styles.elevation : {},
        ]}
      >
        {getSvg(icon, { isSelected })}
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { index } = this.props;
    // const { index } = navigation.state;

    return (
      <View
        style={{
          height,
          width: SCREEN_WIDTH,
          backgroundColor: color.DARK_LIGHT_COLOR,
          ...shadowStyle.ELEVATION_3,
        }}
      >
        <View style={styles.content}>
          {routeConfig.map((item, idx) =>
            this.renderTabIcon({
              icon: item.icon,
              onPress: () => {},
              key: item.title,
              isCenter: item.isCenter,
              isSelected: index === idx,
            })
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  tabbar: {
    borderTopRightRadius: dimension.DEFAULT_BORDER_RADIUS,
    borderTopLeftRadius: dimension.DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    // paddingHorizontal: dimension.DISTANCE_6,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  center: {
    marginBottom: height / 2,
    width: height,
    height,
    borderRadius: height / 2,
    backgroundColor: '#ffffff',
  },
  elevation: {
    ...shadowStyle.ELEVATION_3,
  },
});

export default Tabbar;
