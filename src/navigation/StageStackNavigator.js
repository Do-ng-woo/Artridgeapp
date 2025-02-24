import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StageListScreen from '../screens/StageListScreen';
import StageDetailScreen from '../screens/StageDetailScreen';

const Stack = createStackNavigator();

const StageStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StageListScreen" component={StageListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StageDetailScreen" component={StageDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StageStackNavigator;
