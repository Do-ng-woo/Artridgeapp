import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import StageDetailScreen from '../screens/StageDetailScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="StageDetailScreen" component={StageDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ArtistDetailScreen" component={ArtistDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
