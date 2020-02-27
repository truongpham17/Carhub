import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContainer, InputForm, Button } from 'Components';
import { NavigationType } from 'types';
import { connect } from 'react-redux';
import colors from 'Constants/colors';
import { shadowStyle } from 'Constants';
import { addbook } from '@redux/actions/book';

type PropTypes = {
  navigation: NavigationType,
  addbook: ({ author: String, name: String }) => void,
};
const BookList = ({ navigation, addbook }: PropTypes) => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const onBackPress = () => {
    navigation.pop();
  };
  const onChangeText = text => {
    setBookName(text);
  };
  const onChangeAuthor = author => {
    setAuthor(author);
  };
  const handleAddBook = () => {
    addbook({ name: bookName, author });
    navigation.pop();
  };
  return (
    <ViewContainer haveBackHeader title="Book list" onBackPress={onBackPress}>
      <View style={{ flex: 1 }}>
        <InputForm
          label="Book name"
          placeholder="Enter book name"
          value={bookName}
          onChangeText={onChangeText}
        />
        <InputForm
          label="Author"
          placeholder="Enter author"
          value={author}
          onChangeText={onChangeAuthor}
          containerStyle={{ marginTop: 8 }}
        />
      </View>
      <Button label="Add Book" onPress={handleAddBook} />
    </ViewContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: colors.white,
    ...shadowStyle.ELEVATION_1,
    justifyContent: 'space-around',
    marginVertical: 8,
    padding: 8,
  },
});
export default connect(
  state => ({
    bookList: state.book.bookList,
  }),
  { addbook }
)(BookList);
