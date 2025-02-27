import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const filters = [
  { label: "제목순", value: "title" },
  { label: "인기순", value: "popularity" },
];

const StageFilterBar = ({ selectedFilter, onFilterChange }) => {
  if (!onFilterChange) {
    console.error("⚠️ onFilterChange 함수가 정의되지 않았습니다!");
    return null; // 🚨 필터 변경 함수가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <View style={styles.root}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.filterButton,
              selectedFilter === filter.value && styles.selectedFilter,
            ]}
            onPress={() => {
              console.log(`🟢 필터 변경: ${filter.value}`);
              onFilterChange(filter.value);
            }}
          >
            <Text 
              style={[
                styles.filterText,
                selectedFilter === filter.value && styles.selectedFilterText // ✅ 선택된 경우 흰색 적용
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "#F0F0F0", // 기본 배경색
    marginHorizontal: 8,
  },
  selectedFilter: {
    backgroundColor: "#333", // 선택된 버튼 배경색 (어두운 색)
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333", // 기본 텍스트 색상
  },
  selectedFilterText: {
    color: "#FFF", // ✅ 선택된 필터의 텍스트 색상을 흰색으로 변경
  },
});

export default StageFilterBar;
