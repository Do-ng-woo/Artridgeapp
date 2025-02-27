import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import LoginMainScreen from '../screens/LoginMainScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import ArticleListScreen from '../screens/ArticleListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';


const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* 로그인 메인 스크린 */}
      <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EmailLoginScreen" component={EmailLoginScreen} options={{ headerShown: false }} />
      {/* 프로필 화면 */}
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />

      {/* 공연 정보 관련 네비게이션 */}
      <Stack.Screen name="ArticleListScreen" component={ArticleListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ArtistDetailScreen" component={ArtistDetailScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
