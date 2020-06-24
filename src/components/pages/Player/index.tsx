import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { IconButton } from 'react-native-paper';
import RNTrackPlayer from 'react-native-track-player';
import { useTrackPlayerProgress, TrackPlayerEvents } from 'react-native-track-player'; //this is active
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import Time from './../../atoms/Time';
import BackButton from './../../atoms/BackButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 30, marginBottom: 15 },
});

export default function Player({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [playbackState, setPlaybackState] = useState(RNTrackPlayer.STATE_NONE);
  const { position, duration } = useTrackPlayerProgress();
  const [positionWhilePausing, setPositionWhilePausing] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const onGoBack = () => {
    RNTrackPlayer.stop();
    navigation.goBack();
  };

  useEffect(() => {
    RNTrackPlayer.setupPlayer();
    RNTrackPlayer.add([item]);
    RNTrackPlayer.play();
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
    <SafeAreaView style={styles.container}>
      <BackButton onGoBack={onGoBack} />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.artwork} style={{ width: screenWidth * 0.9, height: screenWidth * 0.6 }} />
        <Slider
          style={{ width: screenWidth * 0.8, height: 40, margin: 10 }}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={async time => {
            RNTrackPlayer.seekTo(time);
            playbackState === RNTrackPlayer.STATE_PLAYING ? '' : setPositionWhilePausing(time);
          }}
          value={position}
        />
        <Time
          playbackState={playbackState}
          position={position}
          positionWhilePausing={positionWhilePausing}
          duration={duration}
        />
        <IconButton
          icon={playbackState === RNTrackPlayer.STATE_PLAYING ? 'pause' : 'play'}
          size={60}
          onPress={async () => {
            if (playbackState === RNTrackPlayer.STATE_PLAYING) {
              RNTrackPlayer.pause();
              setPositionWhilePausing(await RNTrackPlayer.getPosition());
            } else {
              RNTrackPlayer.play();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
