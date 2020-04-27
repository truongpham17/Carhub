import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'Components';
import { textStyle } from 'Constants/textStyles';
import { formatDate } from 'Utils/date';
import { NavigationType, NotificationType } from 'types';
import { appIcon } from 'Assets/images';
import { scaleHor, scaleVer } from 'Constants/dimensions';
import { useDispatch } from 'react-redux';
import { processNotificationInfo } from 'services/notification';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import moment from 'moment';

type PropTypes = {
  data: NotificationType,
  navigation: NavigationType,
};

const NotificationItem = ({ data, navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const { actor, detail, createdDate, navigatorData } = data;

  // const minuteDiff = moment().diff(createdDate, 'seconds');
  const onPress = () => {
    if (!navigatorData) return;
    const { screenName, selectedId } = navigatorData;
    if (screenName) {
      // navigation.navigate(screenName, { selectedId });
      processNotificationInfo({
        notification: {
          data: {
            action: 'NAVIGATE',
            screenName,
            selectedId,
          },
        },
        navigate: navigation.navigate,
        dispatch,
      });
    }
  };
  return (
    <TouchableOpacity style={styles.container}>
      {actor ? (
        <Avatar uri={actor.avatar} style={styles.avatar} />
      ) : (
        <Image style={styles.avatar} source={appIcon} resizeMode="center" />
      )}
      <View style={{ flex: 1 }}>
        <Text style={[textStyle.bodyText]}>
          {detail.map(item => (
            <Text
              style={item.detailType === 'bold' ? textStyle.bodyTextBold : {}}
            >
              {item.value}
            </Text>
          ))}
        </Text>
        <Text style={textStyle.labelRegular}>
          {/* {minuteDiff < 60
            ? `${minuteDiff} minutes ago` */}
          {formatDate(createdDate, true)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: scaleHor(64),
    paddingVertical: scaleVer(12),
    marginHorizontal: scaleHor(4),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  avatar: {
    width: scaleHor(60),
    height: scaleHor(60),
    marginEnd: scaleHor(12),
  },
});

export default NotificationItem;
