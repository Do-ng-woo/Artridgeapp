import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import useEmailLogin from "./src/hooks/useEmailLogin"; // ✅ 로그인 상태 가져오기

// 📌 기존 사용 아이콘
import GridView from './src/assets/svg/Gridview.png';
import HomeIcon from './src/assets/svg/Home.png';
import ChatIcon from './src/assets/svg/Chat.png';
import ProfileIcon from './src/assets/svg/Person.png';
import StageImage from './src/assets/svg/Stage.png';

import ArticleStackNavigator from './src/navigation/ArticleStackNavigator'; // ✅ 추가
import HomeStackNavigator from './src/navigation/HomeStackNavigator';
import StageStackNavigator from './src/navigation/StageStackNavigator';
import ArtistStackNavigator from './src/navigation/ArtistStackNavigator';
import ProfileStackNavigator from './src/navigation/ProfileStackNavigator';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={({ route }) => ({
        headerShown: false, // ✅ 기본 네비게이션 헤더 숨김
        tabBarIcon: ({ color, size }) => {
          let iconSource;
          if (route.name === '홈') iconSource = HomeIcon;
          else if (route.name === '공연장') iconSource = StageImage;
          else if (route.name === '공연 정보') iconSource = GridView;
          else if (route.name === '커뮤니티') iconSource = ChatIcon;
          else if (route.name === '마이') iconSource = ProfileIcon;

          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 10, fontWeight: '700', color: focused ? '#000' : '#888' }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 5, // 그림자 효과
        },

      })}
    >
      <Tab.Screen name="홈" component={HomeStackNavigator} />
      <Tab.Screen name="공연 정보" component={ArticleStackNavigator} />
      <Tab.Screen name="공연장" component={StageStackNavigator} />
      <Tab.Screen name="커뮤니티" component={ArtistStackNavigator} />
      <Tab.Screen name="마이" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default function App() {
  const { loading } = useEmailLogin(); // ✅ 로그인 상태 가져오기

  if (loading) {
    return null; // ✅ 로딩 중에는 아무것도 렌더링하지 않음 (스플래시 화면 추가 가능)
  }

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
