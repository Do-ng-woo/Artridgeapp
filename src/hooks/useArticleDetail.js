import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8000"; // ✅ Django 서버 URL
const API_URL = `${BASE_URL}/articles/api/detail/`;

const useArticleDetail = (articleId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!articleId) return; // ✅ articleId가 없으면 요청하지 않음

    console.log(`🔵 API 요청 시작: ${API_URL}${articleId}/`);

    axios.get(`${API_URL}${articleId}/`)
      .then(response => {
        console.log("🟢 API 응답 성공:", response.data);

        const article = response.data.article;

        // ✅ 이미지 URL 구성 (없을 경우 기본 이미지 적용)
        const formattedArticle = {
          id: article.id,
          title: article.title,
          date: article.date,
          location: article.location,
          image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/media/default_image.jpg`,
          artists: article.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            image: artist.image ? `${BASE_URL}${artist.image}` : `${BASE_URL}/media/default_image.jpg`
          })),
          views: article.views,
          comments: response.data.comments, // 댓글 포함
          link: article.link
        };

        setData(formattedArticle);
        setLoading(false);
        console.log("🎭 아티스트 데이터 확인:", article.artists);
      })
      .catch(err => {
        console.error("🔴 API 요청 오류:", err.message);
        if (err.response) {
          console.error("📌 응답 데이터:", err.response.data);
          console.error("📌 응답 상태 코드:", err.response.status);
        } else if (err.request) {
          console.error("📌 요청이 전송되었으나 응답이 없음:", err.request);
        } else {
          console.error("📌 요청 설정 중 오류 발생:", err.message);
        }
        setError(err.message);
        setLoading(false);
      });

  }, [articleId]);
  

  return { data, loading, error };
};

export default useArticleDetail;
