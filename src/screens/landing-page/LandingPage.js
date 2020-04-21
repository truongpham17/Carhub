import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ViewContainer, Avatar } from 'Components';
import { Icon } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType, UserType } from 'types';
import { textStyle } from 'Constants/textStyles';
import colors from 'Constants/colors';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { carBackground } from 'Assets/images';
import { dimension } from 'Constants';
import Seperator from './Seperator';
import RentalBadge from './RentalBadge';
import HostBadge from './HostBadge';

type PropTypes = {
  navigation: NavigationType,
};

const LandingPage = ({ navigation }: PropTypes) => {
  const user: UserType = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: dimension.SCREEN_WIDTH,
          position: 'absolute',
          height: dimension.SCREEN_HEIGHT,
          opacity: 0.9,
        }}
        source={carBackground}
      />
      <View style={styles.hi}>
        <View>
          <Text style={textStyle.bodyText}>Hello, </Text>
          <Text style={textStyle.widgetItem}>{user.fullName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            name="user"
            type="feather"
            color={colors.white}
            // reverse
            onPress={() => navigation.navigate('ProfileScreen')}
            containerStyle={[{ marginEnd: 12 }, styles.icon]}
          />
          <Icon
            name="bell"
            type="feather"
            color={colors.white}
            // reverse
            containerStyle={styles.icon}
            onPress={() => navigation.navigate('NotificationScreen')}
          />
        </View>
      </View>
      <RentalBadge navigation={navigation} />
      <Seperator />
      <HostBadge navigation={navigation} />
    </View>
  );
};

export default LandingPage;
const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
  },
  hi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.dark40,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: scaleHor(24),
    paddingTop: scaleVer(48),
  },
});
