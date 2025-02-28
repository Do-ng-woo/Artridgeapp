import React, { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import useEmailLogin from "../hooks/useEmailLogin"; // ✅ 로그인 훅 불러오기

// ✅ 로고 이미지 불러오기
import Logo from "../assets/Logo/ArtridgeMainLogo.png";

const EmailLoginScreen = ({ navigation }) => {
  const { login, loading, error } = useEmailLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 입력하세요.");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      Alert.alert("로그인 성공!", `환영합니다, ${result.user.nickname}님!`);
      navigation.replace("ProfileScreen"); // ✅ 로그인 후 메인 화면으로 이동
    } else {
      Alert.alert("로그인 실패", result.error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🎨 로고 */}
      <Image source={Logo} style={styles.logo} />

      {/* 📧 이메일 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* 🔑 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔓 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Log In</Text>}
      </TouchableOpacity>

      {/* 🔹 비밀번호 찾기 & 회원가입 */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* ⚠️ 에러 메시지 표시 */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: -50,
  },
  logo: {
    width: 320,
    height: 110,
    resizeMode: "contain",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default EmailLoginScreen;
