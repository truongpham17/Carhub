import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getTest } from '@redux/actions/user';
import { Avatar } from 'react-native-elements';
import { increaseNumber } from '@redux/actions/testAction';
import { getUser } from '@redux/actions/testUser';

type PropTypes = {
  getTest: () => void,
  isSuccess: boolean,
  count: number,
  increaseNumber: () => void,
  getUser: () => void,
  users: [{ id: String, name: String }],
  error: String,
  loading: Boolean,
};

const TestScreen = ({
  isSuccess = false,
  getTest,
  count,
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

export default connect(
  state => ({
    isSuccess: state.user.isSuccess,
    count: state.testReducer.count,
    loading: state.testUser.loading,
    users: state.testUser.users,
    error: state.testUser.error,
  }),
  { getTest, increaseNumber, getUser }
)(TestScreen);
