import React from 'react';
import { View, Text, StyleSheet /*TouchableOpacity*/ } from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import { Button } from 'react-native-paper';
import RNTrackPlayer from 'react-native-track-player';

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

export default function Player({ route }) {
  const { item } = route.params;
  console.log(item);
  RNTrackPlayer.setupPlayer();
  RNTrackPlayer.add([item]);
  RNTrackPlayer.play();
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Button
        icon="play"
        mode="contained"
        onPress={() => {
          RNTrackPlayer.pause();
        }}
      ></Button>
    </View>
  );
}
