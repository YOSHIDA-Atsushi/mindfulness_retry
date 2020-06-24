import React from 'react';
import { Text, StyleSheet } from 'react-native';
import RNTrackPlayer from 'react-native-track-player';

const styles = StyleSheet.create({
  time: { fontSize: 20, marginBottom: 10 },
});

interface Props {
  playbackState: any;
  position: number;
  positionWhilePausing: number;
  duration: number;
}

function addZero(num) {
  const str = '0' + num;
  return str.substr(-2, 2);
}

export default function Time(props: Props) {
  const { playbackState, position, positionWhilePausing, duration } = props;
  return (
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
  );
}
