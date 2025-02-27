import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import ArticleFilterBar from '../components/ArticleFilterBar';
import ArticleListCard from '../components/ArticleListCard';
import useArticleList from '../hooks/useArticleList'; // ✅ API 호출 훅

const { width } = Dimensions.get('window'); // ✅ 화면 너비 가져오기

const ArticleListScreen = () => {
  const { articles, loading, fetchArticles, setFilter, nextPageUrl } = useArticleList(); // ✅ API 훅 사용
  const [selectedFilter, setSelectedFilter] = useState("new"); // ✅ 현재 선택된 필터

  const handleFilterChange = (filter) => {
    console.log(`🟢 필터 변경 요청: ${filter}`);
    setSelectedFilter(filter);
    setFilter(filter); // ✅ API에 반영
  };

  // ✅ 리스트 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <ArticleListCard 
        id={item.id}
        title={item.title}
        date={item.date}
        location={item.location || "공연장 미정"} // ✅ location이 없을 경우 기본값
        image={item.image}
        artists={Array.isArray(item.artists) ? item.artists : []} // ✅ 배열로 유지하여 전달
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ 검색 헤더 */}
      <SearchHeader placeholder="공연을 검색해주세요" />

      {/* ✅ 공연 리스트 */}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // ✅ id가 없으면 랜덤 값 사용
        numColumns={2} // ✅ 2열 배치
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // ✅ 스크롤바 숨김
        onEndReached={() => {
          if (nextPageUrl) fetchArticles(); // ✅ 다음 페이지 요청
        }}
        onEndReachedThreshold={0.5} // ✅ 50% 스크롤 시 다음 페이지 요청
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#888" /> : null} // ✅ 로딩 인디케이터
        // ✅ 필터바를 리스트의 헤더로 추가하여 함께 스크롤되게 설정
        ListHeaderComponent={() => (
          <ArticleFilterBar 
            selectedFilter={selectedFilter} 
            onFilterChange={handleFilterChange} 
          />
        )}
      />
    </View>
  );
};

// ✅ 스타일 설정 (유지)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 30,
  },
  contentContainer: {
    paddingTop: 8,
    paddingBottom: 32, // ✅ 마지막 아이템과 하단 여백 추가
  },
  gridWrapper: {
    justifyContent: 'space-between', // ✅ 카드 사이 간격 조정
    paddingHorizontal: 16,
  },
  gridItem: {
    width: (width / 2) - 24, // ✅ 한 줄에 2개 배치 (여백 포함)
    marginBottom: 16,
  },
});

export default ArticleListScreen;
