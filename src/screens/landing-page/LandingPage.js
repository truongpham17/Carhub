import React, { useEffect } from 'react';
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
import firebase from 'react-native-firebase';
import { updateUser, getPaymentToken } from '@redux/actions';
import Seperator from './Seperator';
import RentalBadge from './RentalBadge';
import { checkRemoteConfig } from './utils';
import HostBadge from './HostBadge';

type PropTypes = {
  navigation: NavigationType,
};

const LandingPage = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      checkRemoteConfig();
    }, 1000);
  }, []);

  const paymentToken = useSelector(state => state.payment.paymentToken);
  const user: UserType = useSelector(state => state.user);
  useEffect(() => {
    firebase
      .messaging()
      .getToken()
      .then(token => {
        if (token) {
          console.log(token);
          if (token !== user.fcmToken) {
            updateUser(dispatch)({ id: user._id, fcmToken: token });
          }
        }
      });
    if (!paymentToken) {
      getPaymentToken(dispatch)();
    }
  }, []);
  return (
    <ViewContainer style={styles.container} safeArea={false}>
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

        <Icon
          name="bell"
          type="feather"
          color={colors.white}
          // reverse
          containerStyle={styles.icon}
          onPress={() => navigation.navigate('NotificationScreen')}
        />
      </View>
      <RentalBadge navigation={navigation} />
      <Seperator />
      <HostBadge navigation={navigation} />
    </ViewContainer>
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
