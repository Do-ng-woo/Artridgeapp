import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleListScreen from '../screens/ArticleListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createStackNavigator();

const ArticleStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArticleListScreen" component={ArticleListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default ArticleStackNavigator;
