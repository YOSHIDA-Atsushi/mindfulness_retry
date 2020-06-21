import React from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { soundData } from './constants/sounddata';
import { QandA, Settings, Player } from './components/pages';

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

//stack
const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="player" component={Player} />
    </Stack.Navigator>
  );
}

const Layout = (props: any) => <SafeAreaView>{props.children}</SafeAreaView>;

//flatlist
function Main() {
  const { navigate } = useNavigation();
  return (
    <Layout>
      <FlatList
        data={soundData}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index.toString()} onPress={() => navigate('player')}>
            <Text style={styles.label}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Q＆A" component={QandA} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
