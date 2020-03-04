import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getTest } from '@redux/actions/user';
import { getUsers } from '@redux/actions/userTest';
import { increaseCount } from '@redux/actions/testAction';

type PropTypes = {
  getTest: () => void,
  isSuccess: boolean,
  count: number,
  increaseCount: () => void,
  getUsers: () => void,
  users: [{ id: string, name: string }],
  loading: boolean,
  error: {},
};

const TestScreen = ({
  isSuccess = false,
  getTest,
  count,
  increaseCount,
  getUsers,
  users,
  loading,
  error,
}: PropTypes) => {
  useEffect(() => {
    getTest();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={getUsers}>
        <Text>Press here to load user data!</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator />}
      {error && <Text>Co loi roi</Text>}
      {users && users.map(user => <Text>{user.name}</Text>)}
    </View>
  );
};

export default connect(
  state => ({
    isSuccess: state.user.isSuccess,
    count: state.testReducer.count,
    users: state.userTest.users,
    loading: state.userTest.loading,
    error: state.userTest.error,
  }),
  { getTest, increaseCount, getUsers }
)(TestScreen);
