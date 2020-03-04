import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, Button } from 'Components';

import { NavigationType } from 'types';
import { connect } from 'react-redux';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';

type PropTypes = {
  navigation: NavigationType,
  bookList: [
    {
      name: string,
      author: string,
    }
  ],
};

const BookList = ({ navigation, bookList }: PropTypes) => {
  const onBackPress = () => {
    navigation.pop();
  };

  const onAddPress = () => {
    navigation.navigate('AddBook');
  };

  return (
    <ViewContainer haveBackHeader title="Book list" onBackPress={onBackPress}>
      {bookList.map(book => (
        <View style={styles.container}>
          <Text>Author: {book.author}</Text>
          <Text>Name: {book.name}</Text>
        </View>
      ))}
      <Button label="Add book" onPress={onAddPress} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_2,
    justifyContent: 'space-around',
    marginVertical: 8,
    padding: 8,
  },
});

export default connect(state => ({
  bookList: state.book.bookList,
}))(BookList);
