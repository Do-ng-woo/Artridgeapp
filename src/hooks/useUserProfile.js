import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:8000"; // Django 서버 URL
const API_URL = `${BASE_URL}/accounts/api/user/`;

const useUserProfile = () => {
  const [user, setUser] = useState({
    id: null,
    username: "알 수 없음",
    nickname: "닉네임 없음",
    image: `${BASE_URL}/media/myarticleimage/default_profile.jpg`, // 기본 프로필 이미지
    level: 1,
    points: 0,
    post_count: 0,
    comment_count: 0,
    myPerformances: 0, // 내가 본 공연 개수
    myScraps: 0, // 스크랩 개수 (미구현)
  });

  const [performances, setPerformances] = useState([]); // ✅ 내가 본 공연 리스트
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken"); // 🔑 토큰 가져오기
        if (!token) throw new Error("로그인이 필요합니다.");

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Token ${token}` }, // 🔥 인증 헤더 추가
        });

        const userData = response.data.user || {}; // ✅ 유저 정보
        const performanceData = response.data.performances || []; // ✅ 공연 정보

        console.log("🟢 유저 데이터:", userData); // ✅ 유저 데이터 확인
        console.log("🟢 공연 데이터:", performanceData); // ✅ 공연 데이터 확인

        // ✅ 유저 정보 업데이트
        const profileImage = userData.image
          ? `${BASE_URL}${userData.image}`
          : `${BASE_URL}/media/myarticleimage/default_profile.jpg`;

        console.log("🟢 프로필 이미지 URL:", profileImage); // ✅ 프로필 이미지 URL 확인

        setUser({
          id: userData.id || null,
          username: userData.username || "알 수 없음",
          nickname: userData.nickname || "닉네임 없음",
          image: profileImage, // ✅ 이미지 URL 저장
          level: userData.level || 1,
          points: userData.points || 0,
          post_count: userData.post_count || 0,
          comment_count: userData.comment_count || 0,
          myPerformances: performanceData.length, // ✅ 내가 본 공연 개수
          myScraps: 0, // ✅ 스크랩 개수 (미구현)
        });

        // ✅ 공연 정보 저장
        const formattedPerformances = performanceData.map(perf => {
            const articleImage = perf.article_image // ✅ 올바른 필드 사용
            ? perf.article_image
            : `${BASE_URL}/media/default_article.jpg`;
        
            console.log(`🟢 공연 ID: ${perf.id} -> 이미지 URL: ${articleImage}`); // ✅ 각 공연 이미지 확인
        
            return {
            id: perf.id,
            article_id: perf.article, // ✅ 이건 ID라서 그대로 유지
            article_title: perf.article_title || "제목 없음",
            article_image: articleImage, // ✅ 올바른 필드 사용
            article_date: perf.article_date || "날짜 미정",
            rating: perf.rating || 0,
            memo: perf.memo || "",
            };
        });

        setPerformances(formattedPerformances);

      } catch (err) {
        console.error("🔴 유저 프로필 로딩 오류:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, performances, loading, error };
};

export default useUserProfile;
