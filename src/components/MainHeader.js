import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// 📌 SVG 아이콘 & 로고 (PNG 사용 시 `Image`로 감싸야 함)
import SearchIcon from '../assets/svg/Search.png';
import VectorIcon from '../assets/svg/Vector.png';
import ArtridgeLogo from '../assets/svg/ArtridgeLogo.png';

const MainHeader = ({ testID }) => {
  return (
    <View style={styles.root} testID={testID ?? "3:98"}>
      {/* ✅ 왼쪽: 로고 */}
      <Image source={ArtridgeLogo} style={styles.logo} />

      {/* ✅ 오른쪽: 아이콘 2개 (나란히 정렬) */}
      <View style={styles.iconContainer}>
        <Image source={SearchIcon} style={styles.icon} />
        <Image source={VectorIcon} style={styles.icon} />
      </View>
    </View>
  );
};

// 📌 스타일 설정
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ✅ 로고 왼쪽, 아이콘 오른쪽 정렬
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 121,
    height: 46,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row', // ✅ 아이콘을 나란히 정렬
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10, // ✅ 아이콘 간격 추가
  },
});

export default MainHeader;
