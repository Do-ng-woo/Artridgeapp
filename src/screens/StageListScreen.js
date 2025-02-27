import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import StageFilterBar from '../components/StageFilterBar'; // ✅ 필터 바 수정
import StageMainCard from '../components/StageMainCard'; // ✅ 공연장 카드 컴포넌트
import useStageList from '../hooks/useStageList'; // ✅ 공연장 데이터 훅

const { width } = Dimensions.get('window'); // ✅ 화면 너비 가져오기

const StageListScreen = () => {
  const { stages, loading, fetchStages, setFilter, nextPageUrl } = useStageList();
  const [selectedFilter, setSelectedFilter] = useState("title"); // ✅ 기본 필터 제목순

  // ✅ 리스트 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <StageMainCard 
        id={item.id}
        image={item.image}
        name={item.title} // ✅ API에서 title을 공연장 이름으로 사용
        location={item.address}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ 검색 헤더 */}
      <SearchHeader placeholder="공연장을 검색해주세요" />

      {/* ✅ 공연장 리스트 */}
      <FlatList
        data={stages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // ✅ ID를 key로 사용
        numColumns={2} // ✅ 2열 배치
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // ✅ 스크롤바 숨김
        onEndReached={() => {
          if (nextPageUrl) fetchStages(); // ✅ 다음 페이지 요청
        }}
        onEndReachedThreshold={0.5} // ✅ 50% 스크롤 시 다음 페이지 요청
        ListHeaderComponent={
          <StageFilterBar 
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

export default StageListScreen;
