import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image /*TouchableOpacity*/ } from 'react-native';
//import SafeAreaView from 'react-native-safe-area-view';
import { IconButton } from 'react-native-paper';
import RNTrackPlayer from 'react-native-track-player';
import { useTrackPlayerProgress, TrackPlayerEvents } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

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
function stateNumToBoolean(i: string | number): boolean {
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

function addZero(num) {
  const str = '0' + num;
  return str.substr(-2, 2);
}

export default function Player({ route }) {
  const navigation = useNavigation();
  const { position, duration } = useTrackPlayerProgress();
  const onGoBack = () => {
    RNTrackPlayer.stop();
    navigation.goBack();
  };

  const [playbackState, setPlaybackState] = useState(RNTrackPlayer.STATE_NONE);
  console.log(playbackState);
  const { item } = route.params;
  console.log(duration);
  console.log(position);
  useEffect(() => {
    RNTrackPlayer.setupPlayer();
    RNTrackPlayer.add([item]);
    RNTrackPlayer.play();
    console.log(RNTrackPlayer.STATE_PAUSED);
    async function setPlayerState() {
      const playerState = await RNTrackPlayer.getState();
      setPlaybackState(playerState);
    }
    setPlayerState();
    const sub = RNTrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, data => {
      setPlaybackState(data.state);
    });
    return () => {
      sub.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <IconButton icon={'arrow-left'} size={30} onPress={onGoBack} />
      <Text>{item.title}</Text>
      <Image source={item.artwork} style={{ width: 200, height: 200 }} />
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={time => {
          RNTrackPlayer.seekTo(time);
        }}
        value={position}
      />
      <Text>
        {Math.floor(position / 60)}:{addZero(Math.floor(position % 60))} / {Math.floor(duration / 60)}:
        {addZero(Math.floor(duration % 60))}
      </Text>

      <IconButton
        icon={playbackState === RNTrackPlayer.STATE_PLAYING ? 'pause' : 'play'}
        size={50}
        onPress={() => {
          playbackState === RNTrackPlayer.STATE_PLAYING ? RNTrackPlayer.pause() : RNTrackPlayer.play();
        }}
      />
    </View>
  );
}
