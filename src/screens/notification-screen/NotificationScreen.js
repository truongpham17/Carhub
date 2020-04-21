import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationType, NotificationType } from 'types';
import { getNotifications } from '@redux/actions';
import colors from 'Constants/colors';
import NotificationItem from './NotificationItem';

type PropTypes = {
  navigation: NavigationType,
};

const NotificationScreen = ({ navigation }: PropTypes) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notifications: [NotificationType] = useSelector(
    state => state.notification.notifications
  );
  useEffect(() => {
    getNotifications(dispatch)();
  }, []);

  const renderItem = ({ item }) => (
    <NotificationItem data={item} navigation={navigation} />
  );
  return (
    <ViewContainer
      haveBackHeader
      haveBack
      onBackPress={() => navigation.pop()}
      title="Notification"
    >
      <FlatList
        data={notifications || []}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshing={loading}
        onRefresh={() => getNotifications(dispatch)()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.dark80 }} />
        )}
      />
    </ViewContainer>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({});
