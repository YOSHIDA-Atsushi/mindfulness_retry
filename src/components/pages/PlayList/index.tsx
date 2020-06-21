import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { soundData } from './../../../constants/sounddata';

const Layout = (props: any) => <SafeAreaView>{props.children}</SafeAreaView>;

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

//flatlist
export default function PlayList() {
  const { navigate } = useNavigation();
  return (
    <Layout>
      <FlatList
        data={soundData}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index.toString()} onPress={() => navigate('Player', { item: item })}>
            <Text style={styles.label}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
}
