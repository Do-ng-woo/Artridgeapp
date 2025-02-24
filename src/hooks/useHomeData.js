import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://10.0.2.2:8000/homepages/api/home/";
const BASE_URL = "http://10.0.2.2:8000"; // ✅ Django 서버 URL
const DEFAULT_IMAGE = "/media/default_image.jpg"; // ✅ 기본 이미지 경로 (Django 서버에 저장된 기본 이미지)

const useHomeData = () => {
  const [data, setData] = useState({
    latest_articles: [],
    popular_artists: [],
    popular_projects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔵 API 요청 시작:", API_URL);

    axios.get(API_URL)
      .then(response => {
        console.log("🟢 API 응답 성공:", response.data);

        // 🔹 데이터 필드 변환 (이미지 URL 결합)
        const transformedArticles = response.data.latest_articles.map(article => ({
          id: article.id,
          title: article.title,  // 공연 제목
          date: article.date,  // 공연 날짜
          location: article.location.length > 0 ? article.location : "공연장 미정",  // 프로젝트(공연장) 제목
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}${DEFAULT_IMAGE}`,  // ✅ 기본 이미지 적용
          artists: article.artists.map(a => a.name) // 아티스트 이름 리스트
        }));

        // 🔹 인기 아티스트 데이터 변환 (title과 image만 전달)
        const transformedArtists = response.data.popular_artists.map(artist => ({
            id: artist.id,
            name: artist.title,  // 아티스트 이름
            image: artist.image ? `${BASE_URL}${artist.image}` : `${BASE_URL}${DEFAULT_IMAGE}`,  // ✅ 기본 이미지 적용
            tags: [] // ✅ tags는 빈 리스트 반환
          }));

          const transformedProjects = response.data.popular_projects.map(project => ({
            id: project.id,  // 아티스트 이름
            name: project.title,  // 아티스트 이름
            image: project.image ? `${BASE_URL}${project.image}` : `${BASE_URL}${DEFAULT_IMAGE}`,  // ✅ 기본 이미지 적용
            location: project.address,
            tags: [] // ✅ tags는 빈 리스트 반환
          }));

        setData({
          latest_articles: transformedArticles,
          popular_artists: transformedArtists,
          popular_projects: transformedProjects
        });

        setLoading(false);
      })
      .catch(err => {
        console.error("🔴 API 요청 오류:", err.message);
        if (err.response) {
          console.error("📌 응답 데이터:", err.response.data);
          console.error("📌 응답 상태 코드:", err.response.status);
          console.error("📌 응답 헤더:", err.response.headers);
        } else if (err.request) {
          console.error("📌 요청이 전송되었으나 응답이 없음:", err.request);
        } else {
          console.error("📌 요청 설정 중 오류 발생:", err.message);
        }
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useHomeData;
