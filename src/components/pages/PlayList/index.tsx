import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { soundData } from './../../../constants/sounddata';
import { PLAYER } from './../../../constants/path';

//const Layout = (props: any) => <SafeAreaView>{props.children}</SafeAreaView>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9ddff',
    padding: 10,
    marginTop: 20,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginLeft: 15,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

function Item({ item }) {
  return (
    <View style={styles.item}>
      <Image source={item.artwork} style={styles.tinyLogo} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

//flatlist
export default function PlayList() {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView>
      <FlatList
        data={soundData}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index.toString()} onPress={() => navigate(PLAYER, { item: item })}>
            <Item item={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
