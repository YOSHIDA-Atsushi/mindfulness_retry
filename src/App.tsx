import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { default as StackNavigator } from './routes';

export default function () {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
