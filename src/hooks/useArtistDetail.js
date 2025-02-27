import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8000"; // Django 서버 URL
const API_URL = `${BASE_URL}/artists/api/detail/`;

// ✅ articles 데이터를 가공하는 함수
const formatArticles = (articles) => {
  return articles.map(article => ({
    id: article.id,
    title: article.title,
    image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/media/default_image.jpg`,
    content: article.content || "공연 설명이 없습니다.",
    date: article.date || "날짜 정보 없음",
    location: article.location || "장소 정보 없음",
    link: article.link || null,
    views: article.views || 0,
    likes: article.like || 0,
    comments: article.comments || [],
    artists: article.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.image ? `${BASE_URL}${artist.image}` : `${BASE_URL}/media/default_image.jpg`
    })),
  }));
};

const useArtistDetail = (artistId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistId) return; // ✅ artistId가 없으면 요청하지 않음

    console.log(`🔵 API 요청 시작: ${API_URL}${artistId}/`);

    axios.get(`${API_URL}${artistId}/`)
      .then(response => {
        console.log("🟢 API 응답 성공:", response.data);

        const artist = response.data.artist;

        // ✅ 데이터 가공
        const formattedArtist = {
          id: artist.id,
          name: artist.title,
          image: artist.image ? `${BASE_URL}${artist.image}` : `${BASE_URL}/media/default_image.jpg`,
          description: artist.description || "설명을 추가해 주세요.",
          articles: formatArticles(response.data.articles),  // 🔹 articles 가공 함수 적용
          sings: response.data.sings || [],
          hotRankings: response.data.hot_rankings || [],
          initial_slide_index: response.data.initial_slide_index ?? 0,
          views: artist.views || 0,
          likes: artist.like || 0,
          comments: response.data.comments || []
        };

        setData(formattedArtist);
        setLoading(false);
      })
      .catch(err => {
        console.error("🔴 API 요청 오류:", err.message);
        setError(err.message);
        setLoading(false);
      });

  }, [artistId]);

  return { data, loading, error };
};

export default useArtistDetail;
