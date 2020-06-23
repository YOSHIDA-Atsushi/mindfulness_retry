import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    height: 100,
  },
});

export default function QA() {
  return (
    <View style={styles.container}>
      <Text>Q＆A</Text>
    </View>
  );
}
