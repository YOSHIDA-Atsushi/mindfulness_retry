import React, { useState, useEffect } from 'react';
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

//RNTrackPlayer.getState() returns 2 (stopped) or 3(playing). would like a boolean
function stateNumToBoolean(i: number | string): boolean {
  switch (i) {
    case 2:
      return false;
    case 3:
      return true;
    default:
      return false;
  }
}

export default function Player({ route }) {
  const { item } = route.params;
  const [stateAndPosition, setStateAndPosition] = useState({ isPlaying: true, position: 0 });
  useEffect(() => {
    RNTrackPlayer.setupPlayer();
    RNTrackPlayer.add([item]);
    RNTrackPlayer.play();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Button
        icon={stateAndPosition.isPlaying ? 'pause' : 'play'}
        mode="contained"
        onPress={async () => {
          const state: number | string = await RNTrackPlayer.getState();
          const isPlaying: boolean = stateNumToBoolean(state);
          const position: number = await RNTrackPlayer.getPosition();
          if (isPlaying) {
            RNTrackPlayer.pause();
          } else {
            RNTrackPlayer.play();
            RNTrackPlayer.seekTo(stateAndPosition.position);
          }
          setStateAndPosition({ isPlaying: !isPlaying, position: position });
        }}
      >
        {' '}
      </Button>
    </View>
  );
}
