import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addTest } from '@redux/actions/testapiAction';

type PropTypes = {
  addTest: ({ title: String, description: String }) => void,
  navigation: {},
};

const AddTestScreen = ({ addTest, navigation }: PropTypes) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChangeTitle = title => {
    setTitle(title);
  };

  const handleChangeDescription = description => {
    setDescription(description);
  };

  const handleAddNew = () => {
    addTest({ title, description });
    navigation.pop();
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={handleChangeTitle}
        placeholder="Input title"
      />
      <TextInput
        value={description}
        onChangeText={handleChangeDescription}
        placeholder="Input description"
      />
      <Button title="Add" onPress={handleAddNew} />
    </View>
  );
};

export default connect(state => ({}), { addTest })(AddTestScreen);
