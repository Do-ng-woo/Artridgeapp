import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8000"; // Django 서버 URL
const API_URL = `${BASE_URL}/articles/api/list/`;

const useArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("new"); // 기본 필터: 최신순
  const [nextPageUrl, setNextPageUrl] = useState(null); // 다음 페이지 URL 저장
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지

  // ✅ API 요청 함수
  const fetchArticles = async (reset = false) => {
    if (isFetching || (nextPageUrl === null && !reset)) return; // 이미 요청 중이거나 다음 페이지 없음

    setIsFetching(true);
    setLoading(true);

    try {
      const response = await axios.get(reset ? API_URL : nextPageUrl, {
        params: reset ? { type: filter } : {}, // 필터 변경 시 처음부터 요청
      });

      console.log("🟢 API 응답 데이터:", response.data.results); // ✅ API 응답 확인

      const formattedData = response.data.results.map((item) => ({
        id: item.id,
        title: item.title,
        date: item.date || "날짜 미정", // ✅ 날짜가 없으면 기본값
        location: item.location || "공연장 미정", // ✅ 공연 장소 기본값
        image: item.image ? `${BASE_URL}${item.image}` : "/media/default_article.jpg", // ✅ 이미지 URL 재정의
        artists: Array.isArray(item.artists) ? item.artists.map(artist => ({
          id: artist.id,
          name: artist.name,
          image: artist.image ? `${BASE_URL}${artist.image}` : "/media/default_artist.jpg" // ✅ 아티스트 이미지 URL 변환
        })) : [],
        views: item.views || 0,
        commentCount: item.comment_count || 0,
        like: item.like || 0,
        link: item.link || null
      }));

      if (reset) {
        setArticles(formattedData);
      } else {
        setArticles((prev) => [...prev, ...formattedData]);
      }

      setNextPageUrl(response.data.next); // ✅ 다음 페이지 URL 저장
    } catch (err) {
      console.error("🔴 API 요청 오류:", err.message);
      setError(err.message);
    } finally {
      setIsFetching(false);
      setLoading(false);
    }
  };

  // ✅ 필터 변경 시 초기화 후 다시 요청
  useEffect(() => {
    setNextPageUrl(API_URL); // 초기 URL로 리셋
    fetchArticles(true); // 새로운 필터로 요청
  }, [filter]);

  return { articles, loading, error, fetchArticles, setFilter, nextPageUrl };
};

export default useArticleList;
