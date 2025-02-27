import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8000"; // Django 서버 URL
const API_URL = `${BASE_URL}/projects/api/list/`;

const useStageList = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("title"); // 기본 필터: 제목순
  const [nextPageUrl, setNextPageUrl] = useState(null); // 다음 페이지 URL 저장
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지

  // ✅ API 요청 함수
  const fetchStages = async (reset = false) => {
    if (isFetching || (nextPageUrl === null && !reset)) return; // 이미 요청 중이거나 다음 페이지 없음

    setIsFetching(true);
    setLoading(true);

    try {
      const response = await axios.get(reset ? API_URL : nextPageUrl, {
        params: reset ? { order_by: filter } : {}, // 필터 변경 시 처음부터 요청
      });

      console.log("🟢 API 응답 데이터:", response.data.results); // ✅ API 응답 확인

      const formattedData = response.data.results.map((item) => ({
        id: item.id,
        title: item.title,
        writer: item.writer,
        description: item.description || "설명을 추가해 주세요",
        image: item.image || "/media/defalt_image/defalt_stage.jpg", // ✅ 이미지 기본값 설정
        address: item.address || "주소 정보 없음",
        latitude: item.latitude,
        longitude: item.longitude,
        like: item.like || 0,
        views: item.views || 0,
        commentCount: item.comment_count || 0,
        createdAt: item.created_at,
      }));

      if (reset) {
        setStages(formattedData);
      } else {
        setStages((prev) => [...prev, ...formattedData]);
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
    fetchStages(true); // 새로운 필터로 요청
  }, [filter]);

  return { stages, loading, error, fetchStages, setFilter, nextPageUrl };
};

export default useStageList;
