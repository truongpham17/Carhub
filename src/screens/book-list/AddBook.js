import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';

import { NavigationType } from 'types';
import { connect } from 'react-redux';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { addBook } from '@redux/actions/book';

type PropTypes = {
  navigation: NavigationType,
  addBook: ({ author: string, name: string }) => void,
};

const BookList = ({ navigation, addBook }: PropTypes) => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const onBackPress = () => {
    navigation.pop();
  };

  const onChangeBookName = text => {
    setBookName(text);
  };

  const onChangeAuthor = author => {
    setAuthor(author);
  };

  const handleAddBook = () => {
    addBook({ name: bookName, author });
    navigation.pop();
  };

  return (
    <ViewContainer haveBackHeader title="Add book" onBackPress={onBackPress}>
      <View style={{ flex: 1 }}>
        <InputForm
          label="Book name"
          placeholder="Enter book name"
          value={bookName}
          onChangeText={onChangeBookName}
        />
        <InputForm
          label="Author"
          placeholder="Enter auhor"
          value={author}
          onChangeText={onChangeAuthor}
          containerStyle={{ marginTop: 16 }}
        />
      </View>

      <Button label="Add book" onPress={handleAddBook} />
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

export default connect(
  state => ({
    bookList: state.book.bookList,
  }),
  { addBook }
)(BookList);
