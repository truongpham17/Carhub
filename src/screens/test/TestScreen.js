import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TestScreen = () => (
  <View style={styles.container}>
    <Text>This is default screen</Text>
  </View>
);

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
