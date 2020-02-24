import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const UpdateTestScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {}, []);

  const getItemData = () => {};

  const handleTitleChange = title => {
    setTitle(title);
  };

  const handleDescriptionChange = desc => {
    setDescription(desc);
  };

  const handleUpdateItem = () => {};

  const handleDeleteItem = () => {};

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={handleTitleChange}
        placeholder="Input title"
      />
      <TextInput
        value={description}
        onChangeText={handleDescriptionChange}
        placeholder="Input description"
      />
      <Button title="Update" onPress={handleUpdateItem} />
      <Button title="Delete" color="red" onPress={handleDeleteItem} />
    </View>
  );
};

export default UpdateTestScreen;
