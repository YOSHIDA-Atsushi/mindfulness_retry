import React from 'react';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const soundData = [
  { id: 'first', title: 'mindfulness 1' },
  { id: 'second', title: 'mindfulness 2' },
  { id: 'third', title: 'mindfulness 3' },
];

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

function Player() {
  return (
    <View style={styles.container}>
      <Text>Player</Text>
    </View>
  );
}

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

function QA() {
  return (
    <View style={styles.container}>
      <Text>Q&A</Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Q&A" component={QA} />
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
