import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// ✅ 필터 데이터 예제 (props로 전달 가능)
const defaultFilters = ["최신순", "인기순", "추천", "내 주변"];

const ArticleFilterBar = ({ filters = defaultFilters }) => {
  return (
    <View style={styles.root}>
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: 390,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom:5
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: '#F0F0F0', // ✅ 기본 배경색 (수정 가능)
    marginHorizontal: 15, // ✅ 필터 간 간격 조정
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333', // ✅ 텍스트 색상
  },
});

export default ArticleFilterBar;
