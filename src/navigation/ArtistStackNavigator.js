import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArtistListScreen from '../screens/ArtistListScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';

const Stack = createStackNavigator();

const ArtistStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* 🎨 아티스트 리스트 화면 */}
      <Stack.Screen name="ArtistListScreen" component={ArtistListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArtistDetailScreen" component={ArtistDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ArtistStackNavigator;
