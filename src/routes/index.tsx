import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QandA, Settings, Player, PlayList } from './../components/pages';
import { PLAYLIST, QANDA, SETTINGS, PLAYER } from './../constants/path';
import Ionicons from 'react-native-vector-icons/Ionicons'; // this is active

//tab
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === PLAYLIST) {
            iconName = 'ios-musical-notes';
          } else if (route.name === SETTINGS) {
            iconName = 'ios-settings';
          } else if (route.name === QANDA) {
            iconName = 'md-help';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={PLAYER}
        component={Player}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
