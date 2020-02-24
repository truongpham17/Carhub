import React, { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getTest } from '@redux/actions/testapiAction';
import TestItem from './testItem';

type TestType = {
  title: String,
  description: String,
};

type PropTypes = {
  tests: [TestType],
  getTest: () => void,
  navigation: {},
};

const TestScreen = ({ tests, getTest, navigation }: PropTypes) => {
  useEffect(() => {
    getTest();
  }, []);
  // eslint-disable-next-line react/prop-types
  const getKeyExtractor = (item, index) => index.toString();
  // eslint-disable-next-line react/prop-types
  const renderTestItem = ({ item }) => <TestItem {...item} />;

  const handleAddNew = () => {
    navigation.navigate('AddTestScreen');
  };

  return (
    <View>
      <FlatList
        data={tests}
        renderItem={renderTestItem}
        keyExtractor={getKeyExtractor}
      />
      <Button title="Add new" onPress={handleAddNew} />
    </View>
  );
};

export default connect(
  state => ({
    tests: state.testapiReducer.tests,
    error: state.testapiReducer.error,
    loading: state.testapiReducer.loading,
  }),
  { getTest }
)(TestScreen);
