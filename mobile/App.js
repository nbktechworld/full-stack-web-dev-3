import { StatusBar } from 'expo-status-bar';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import ImageGallery from './screens/ImageGallery';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Messages from './screens/Messages';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageGallery" component={ImageGallery} options={{ title: 'Gallery' }} />
        <Stack.Screen name="Messages" component={Messages} options={{ title: 'Board' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
