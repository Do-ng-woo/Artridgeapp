import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
