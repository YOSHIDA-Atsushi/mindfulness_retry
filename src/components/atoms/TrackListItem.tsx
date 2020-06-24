import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9ddff',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  title: { fontSize: 30, marginLeft: 15 },
});

interface Props {
  title: string;
  artwork: any;
}

export default function TrackListItem(props: Props) {
  return (
    <View style={styles.item}>
      <Image source={props.artwork} style={styles.tinyLogo} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}
