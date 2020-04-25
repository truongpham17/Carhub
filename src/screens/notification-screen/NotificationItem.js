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

type PropTypes = {
  data: NotificationType,
  navigation: NavigationType,
};

const NotificationItem = ({ data, navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const { actor, detail, createdDate, navigatorData } = data;
  console.log(navigatorData);
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
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {actor ? (
        <Avatar uri={actor.avatar} style={styles.avatar} />
      ) : (
        <Image style={styles.avatar} source={appIcon} resizeMode="center" />
      )}
      <View>
        <Text style={textStyle.bodyText}>
          {detail.map(item => (
            <Text
              style={item.detailType === 'bold' ? textStyle.bodyTextBold : {}}
            >
              {item.value}
            </Text>
          ))}
        </Text>
        <Text style={textStyle.labelRegular}>{formatDate(createdDate)}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: scaleHor(64),
    paddingVertical: scaleVer(12),
    marginHorizontal: scaleHor(4),
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: scaleHor(60),
    height: scaleHor(60),
    marginEnd: scaleHor(12),
  },
});

export default NotificationItem;
