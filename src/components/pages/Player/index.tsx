import React from 'react';
import { View, Text, StyleSheet /*TouchableOpacity*/ } from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
//import { Button } from 'react-native-paper';

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

export default function Player() {
  return (
    <View style={styles.container}>
      <Text>Player</Text>
    </View>
  );
}
