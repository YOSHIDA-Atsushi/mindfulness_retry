import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import SafeAreaView from 'react-native-safe-area-view';
import { QandA, Settings, Player, PlayList } from './../components/pages';
import { PLAYLIST, QANDA, SETTINGS, PLAYER } from './../constants/path';

//tab
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={PLAYLIST} component={PlayList} />
      <Tab.Screen name={QANDA} component={QandA} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}

//stack
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="MindfulApp"
        component={TabNavigator}
        options={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={PLAYER}
        component={Player}
        options={{
          headerShown: false,
        }}
        /*
        options={({ route }) => ({
          headerTitle: route.params.item.title,
        })}
        */
      />
    </Stack.Navigator>
  );
}
