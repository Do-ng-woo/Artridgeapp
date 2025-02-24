import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8000"; // ✅ Django 서버 URL
const API_URL = `${BASE_URL}/projects/api/detail/`;

const useStageDetail = (stageId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stageId) return; // ✅ ID가 없으면 요청하지 않음

    console.log(`🔵 API 요청 시작: ${API_URL}${stageId}/`);

    axios.get(`${API_URL}${stageId}/`)
      .then(response => {
        console.log("🟢 API 응답 성공:", response.data);

        const project = response.data.project;

        // ✅ 데이터 변환
        const formattedStage = {
          id: project.id,
          name: project.title,
          image: project.image ? `${BASE_URL}${project.image}` : `${BASE_URL}/media/default_image.jpg`,
          location: project.address,
          latitude: project.latitude,
          longitude: project.longitude,
          like: project.like,
          views: project.views,
          comments: response.data.comments,
          total_comments: response.data.total_comments,
          total_communities: response.data.total_communities,
          articles: response.data.articles.map(article => ({
            id: article.id,
            title: article.title,
            image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/media/default_image.jpg`,
            date: article.date,
            location: article.location,
            artists: article.artists.map(artist => ({
              id: artist.id,
              name: artist.name,
              image: artist.image ? `${BASE_URL}${artist.image}` : `${BASE_URL}/media/default_image.jpg`
            })),
            views: article.views,
            comment_count: article.comment_count,
            like: article.like,
            link: article.link
          }))
        };

        setData(formattedStage);
        setLoading(false);
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

  }, [stageId]);

  return { data, loading, error };
};

export default useStageDetail;
