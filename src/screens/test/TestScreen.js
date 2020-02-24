<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getTest } from '@redux/actions/user';
import { Avatar } from 'react-native-elements';
<<<<<<< HEAD
import { getUsers } from '@redux/actions/userTest';
import { increaseCount } from '@redux/actions/testAction';
=======
import { increaseNumber } from '@redux/actions/testAction';
import { getUser } from '@redux/actions/testUser';
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3

type PropTypes = {
  getTest: () => void,
  isSuccess: boolean,
  count: number,
<<<<<<< HEAD
  increaseCount: () => void,
  getUsers: () => void,
  users: [{ id: string, name: string }],
  loading: boolean,
  error: {},
=======
  increaseNumber: () => void,
  getUser: () => void,
  users: [{ id: String, name: String }],
  error: String,
  loading: Boolean,
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3
};

const TestScreen = ({
  isSuccess = false,
  getTest,
  count,
<<<<<<< HEAD
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
=======
  increaseNumber,
  users,
  getUser,
  error,
  loading,
}: PropTypes) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {/* <Text>Welcome you to come to the app</Text>
      <Avatar rounded title="MD" />
      <Text>Connect to the server: {isSuccess ? 'success' : 'loading'}</Text>
      <Text>My Number is: {count}</Text>
      <Button onPress={increaseNumber} title="Increase" /> */}
    {/* <CarDesc
        carName="Audi V4"
        carType="Exclusive car"
        pricePerDay="50$/day"
        rating={5}
        total="500$"
      /> */}
    <TouchableOpacity onPress={getUser}>
      <Text>Click to load!</Text>
    </TouchableOpacity>
    {loading && <ActivityIndicator />}
    {error && <Text>{error}</Text>}
    {users && users.map(user => <Text>{user.name}</Text>)}
  </View>
);
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3

export default connect(
  state => ({
    isSuccess: state.user.isSuccess,
    count: state.testReducer.count,
<<<<<<< HEAD
    users: state.userTest.users,
    loading: state.userTest.loading,
    error: state.userTest.error,
  }),
  { getTest, increaseCount, getUsers }
=======
    loading: state.testUser.loading,
    users: state.testUser.users,
    error: state.testUser.error,
  }),
  { getTest, increaseNumber, getUser }
>>>>>>> d057c2e49442e782e8f94d5af82b97a58d2ecff3
)(TestScreen);
