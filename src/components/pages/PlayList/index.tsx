import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { soundData } from './../../../constants/sounddata';
import { PLAYER } from './../../../constants/path';
import TrackListItem from './../../atoms/TrackListItem';

//const Layout = (props: any) => <SafeAreaView>{props.children}</SafeAreaView>;

//flatlist
export default function PlayList() {
  const { navigate } = useNavigation();
  return (
    <FlatList
      data={soundData}
      renderItem={({ item, index }) => (
        <TouchableOpacity key={index.toString()} onPress={() => navigate(PLAYER, { item: item })}>
          <TrackListItem title={item.title} artwork={item.artwork} />
        </TouchableOpacity>
      )}
    />
  );
}
