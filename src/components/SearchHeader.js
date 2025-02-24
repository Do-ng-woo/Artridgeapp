import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// ✅ 아이콘 (본인 프로젝트 경로에 맞게 수정)
import SearchIcon from '../assets/svg/Search.png';
import TuneIcon from '../assets/svg/Tune.png';

const SearchHeader = ({ placeholder = "공연을 검색해주세요" }) => {
  return (
    <View style={styles.root}>
      {/* ✅ 검색 바 (Search 아이콘 + 텍스트) */}
      <View style={styles.searchBar}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </View>

      {/* ✅ 설정 아이콘 (Tune) */}
      <Image source={TuneIcon} style={styles.tuneIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(210, 210, 210, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center', // ✅ 내부 요소 세로 중앙 정렬
    width: 320,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 12,
  },  
  searchIcon: {
    width: 30, // ✅ 아이콘 크기 조정
    height: 30,
    resizeMode: 'contain',
    marginTop:6,
  },
  placeholderText: {
    marginLeft: 0,
    color: 'rgba(103, 103, 103, 1)',
    fontFamily: 'Kalam',
    fontSize: 18,
    fontWeight: '700',
    alignItems: 'center',
  },
  tuneIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default SearchHeader;
