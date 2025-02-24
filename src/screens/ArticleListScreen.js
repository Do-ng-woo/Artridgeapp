import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import ArticleFilterBar from '../components/ArticleFilterBar';
import ArticleListCard from '../components/ArticleListCard';
import { articles } from '../testdata/testdata1';

const { width } = Dimensions.get('window'); // ✅ 화면 너비 가져오기

const ArticleListScreen = () => {
  // ✅ 리스트 렌더링 함수
  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <ArticleListCard 
        title={item.title}
        date={item.date}
        location={item.location}
        artists={item.artists}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ 검색 헤더 */}
      <SearchHeader placeholder="공연을 검색해주세요" />

      {/* ✅ FlatList 내부에 필터 바 포함 */}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // ✅ 2열 배치
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} // ✅ 스크롤바 숨김
        ListHeaderComponent={<ArticleFilterBar />} // ✅ 필터 바를 리스트 헤더로 추가
      />
    </View>
  );
};

// ✅ 스타일 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 30
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
