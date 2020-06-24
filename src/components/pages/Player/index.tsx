import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, StyleSheet, Image /*TouchableOpacity*/ } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { IconButton } from 'react-native-paper';
import RNTrackPlayer from 'react-native-track-player';
import { useTrackPlayerProgress, TrackPlayerEvents } from 'react-native-track-player'; //this is active
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  backButton: { flex: 1, alignItems: 'flex-start', marginLeft: 10 },

  body: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 30, marginBottom: 15 },
  time: { fontSize: 20, marginBottom: 10 },
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

  const [positionWhilePausing, setPositionWhilePausing] = useState(0);
  const [playbackState, setPlaybackState] = useState(RNTrackPlayer.STATE_NONE);
  const { item } = route.params;
  const screenWidth = Dimensions.get('window').width;
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
      <View style={styles.header}>
        <View style={styles.backButton}>
          <IconButton style={styles.backButton} icon={'arrow-left'} size={35} onPress={onGoBack} />
        </View>
      </View>
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
        <Text style={styles.time}>
          {playbackState === RNTrackPlayer.STATE_PLAYING
            ? Math.floor(position / 60)
            : Math.floor(positionWhilePausing / 60)}
          :
          {addZero(
            playbackState === RNTrackPlayer.STATE_PLAYING
              ? Math.floor(position % 60)
              : Math.floor(positionWhilePausing % 60),
          )}{' '}
          / {Math.floor(duration / 60)}:{addZero(Math.floor(duration % 60))}
        </Text>

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
