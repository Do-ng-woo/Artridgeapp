import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import LoginMainScreen from '../screens/LoginMainScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import ArticleListScreen from '../screens/ArticleListScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';
import useEmailLogin from "../hooks/useEmailLogin"; // ✅ 로그인 상태 가져오기

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const { user, loading } = useEmailLogin(); // ✅ 로그인 상태 확인

  if (loading) {
    return null; // ✅ 로딩 중에는 아무것도 렌더링하지 않음 (스플래시 화면 추가 가능)
  }

  return (
      <Stack.Navigator initialRouteName={user ? "ProfileScreen" : "LoginMainScreen"}>
        {/* ✅ 로그인 상태와 관계없이 모든 화면 포함 */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmailLoginScreen" component={EmailLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArticleListScreen" component={ArticleListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArtistDetailScreen" component={ArtistDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
