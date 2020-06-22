import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image /*TouchableOpacity*/ } from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import { Button } from 'react-native-paper';
import RNTrackPlayer from 'react-native-track-player';
import { useTrackPlayerProgress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

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
/*
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
*/

export default function Player({ route }) {
  const { position, duration } = useTrackPlayerProgress();
  const { item } = route.params;
  const [isPlaying, setIsPlaying] = useState(true);
  //  const duration = item.duration;
  console.log(duration);
  console.log(position);
  useEffect(() => {
    RNTrackPlayer.setupPlayer();
    RNTrackPlayer.add([item]);
    RNTrackPlayer.play();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Image source={item.artwork} style={{ width: 200, height: 200 }} />
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={time => RNTrackPlayer.seekTo(time)}
        value={position}
      />
      <Button
        icon={isPlaying ? 'pause' : 'play'}
        onPress={async () => {
          //const tempState: number | string = await RNTrackPlayer.getState();
          //const tempIsPlaying: boolean = stateNumToBoolean(tempState);
          if (isPlaying) {
            RNTrackPlayer.pause();
          } else {
            RNTrackPlayer.play();
            RNTrackPlayer.seekTo(position);
          }
          setIsPlaying(!isPlaying);
        }}
      >
        {' '}
      </Button>
    </View>
  );
}
