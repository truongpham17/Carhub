import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ViewContainer } from 'Components';

import { getLogs } from '@redux/actions/log';
import { connect, useDispatch, useSelector } from 'react-redux';

import { NavigationType } from 'types';
import moment from 'moment';
import TimeLineItem from './TimeLineItem';

type PropTypes = {
  navigation: NavigationType,
};

const TimelineScreen = ({ navigation }: PropTypes) => {
  const { id } = navigation.state.params;
  const dispatch = useDispatch();
  const [refreshing, setRefresh] = useState(false);
  const loading = useSelector(state => state.log.loading);
  const data = useSelector(state => state.log.data);
  console.log(data);

  const timelineData = data.map(item => ({
    date: moment(item.createdAt).format('MMM DD YYYY'),
    detail: item.title,
  }));
  useEffect(() => {
    getLogs(dispatch)(id);
  }, []);
  const onBackPress = () => {
    navigation.pop();
  };

  const onRefresh = () => {
    getLogs(dispatch)(id, {
      onSuccess() {
        setRefresh(false);
      },
      onFailure() {
        setRefresh(false);
      },
    });
  };

  return (
    <ViewContainer
      loading={loading}
      haveBackHeader
      title="Time line"
      onBackPress={onBackPress}
    >
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={timelineData}
        renderItem={({ item }) => <TimeLineItem {...item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </ViewContainer>
  );
};

export default TimelineScreen;
const styles = StyleSheet.create({});
