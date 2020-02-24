import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { shadowStyle } from 'Constants';
import colors from 'Constants/colors';
import { textStyle } from 'Constants/textStyles';

type PropTypes = {
  title: String,
  description: String,
  navigation: {},
};

const TestItem = ({ title, description, navigation }: PropTypes) => {
  const handleUpdateItem = () => {
    navigation.navigate('UpdateTestScreen');
  };
  return (
    <TouchableWithoutFeedback onPress={handleUpdateItem}>
      <View style={styles.container}>
        <Text style={textStyle.widgetItem}>{title}</Text>
        <Text style={textStyle.bodyText}>{description}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    ...shadowStyle.ELEVATION_3,
    padding: 12,
    backgroundColor: colors.white,
  },
});

export default TestItem;
