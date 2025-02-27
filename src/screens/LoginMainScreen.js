import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

// ✅ 로고 및 로그인 버튼 이미지 불러오기
import Logo from '../assets/Logo/ArtridgeMainLogo.png';
import EmailLogin from '../assets/LoginBarimg/EmailLogin.png';
import GoogleLogin from '../assets/LoginBarimg/GoogleLogin.png';
import NaverLogin from '../assets/LoginBarimg/NaverLogin.png';
import KakaoLogin from '../assets/LoginBarimg/KakaoLogin.png';

const LoginMainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 🎨 로고 */}
      <Image source={Logo} style={styles.logo} />

      {/* 로그인 버튼들 */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('EmailLoginScreen')}>
        <Image source={EmailLogin} style={styles.loginButton} />
      </TouchableOpacity>
        
        <TouchableOpacity>
          <Image source={GoogleLogin} style={styles.loginButton} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={NaverLogin} style={styles.loginButton} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={KakaoLogin} style={styles.loginButton} />
        </TouchableOpacity>
      </View>

      {/* 회원가입 링크 */}
      <Text style={styles.signupText}>
        Don’t have an account? 
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUpScreen')}>
          {' '}Sign Up
        </Text>
      </Text>
    </View>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 150, // 버튼과 간격
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    width: 300, // 버튼 너비 조정
    height: 50, // 버튼 높이 조정
    resizeMode: 'contain',
    marginVertical: 8, // 버튼 간격 조정
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginMainScreen;
