import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000/accounts/api/login/"; // Django API 주소
const USER_URL = "http://10.0.2.2:8000/accounts/api/user/"; // 사용자 정보 API

const useEmailLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ 앱 실행 시 저장된 토큰으로 자동 로그인
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        // 토큰이 있으면 사용자 정보 가져오기
        const response = await fetch(USER_URL, {
          headers: { Authorization: `Token ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          await AsyncStorage.removeItem("authToken"); // 토큰이 유효하지 않으면 삭제
        }
      } catch (err) {
        console.error("🔴 자동 로그인 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ✅ 로그인 함수 (토큰 저장)
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("authToken", data.token); // ✅ 토큰 저장
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.error || "로그인 실패");
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError("네트워크 오류 발생");
      return { success: false, error: "네트워크 오류 발생" };
    } finally {
      setLoading(false);
    }
  };

  // ✅ 로그아웃 함수 (토큰 삭제)
  const logout = async () => {
    await AsyncStorage.removeItem("authToken"); // 🔑 토큰 삭제
    setUser(null);
  };

  return { user, login, logout, loading, error };
};

export default useEmailLogin;
