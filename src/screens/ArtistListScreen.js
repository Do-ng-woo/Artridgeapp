import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import ArtistFilterBar from '../components/ArtistFilterBar'; // ✅ 아티스트 필터 바 컴포넌트
import ArtistMainCard from '../components/ArtistMainCard'; // ✅ 아티스트 카드 컴포넌트
import useArtistList from '../hooks/useArtistList'; // ✅ API 요청 훅

const { width } = Dimensions.get('window'); // ✅ 화면 너비 가져오기

const ArtistListScreen = () => {
  const { artists, loading, fetchArtists, setFilter, nextPageUrl } = useArtistList(); // ✅ API 훅 사용
  const [selectedFilter, setSelectedFilter] = useState("title"); // ✅ 현재 선택된 필터

  // ✅ 리스트 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <ArtistMainCard 
        id={item.id}
        image={item.image}
        name={item.title} // ✅ title을 name으로 매핑
        tags={[]} // ✅ sub_titles를 tags로 전달
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ 검색 헤더 */}
      <SearchHeader placeholder="아티스트를 검색해주세요" />

      {/* ✅ 아티스트 리스트 */}
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // ✅ ID를 key로 사용
        numColumns={2} // ✅ 2열 배치
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // ✅ 스크롤바 숨김
        onEndReached={() => {
          if (nextPageUrl) fetchArtists(); // ✅ 다음 페이지 요청
        }}
        onEndReachedThreshold={0.5} // ✅ 50% 스크롤 시 다음 페이지 요청
        ListHeaderComponent={
          <ArtistFilterBar 
            selectedFilter={selectedFilter} 
            onFilterChange={(filter) => {
              setSelectedFilter(filter);
              setFilter(filter); // ✅ 필터 변경 시 API 요청
            }}
          />
        } // ✅ 필터 바 추가
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#888" /> : null} // ✅ 로딩 인디케이터
      />
    </View>
  );
};

// ✅ 스타일 설정
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

export default ArtistListScreen;
