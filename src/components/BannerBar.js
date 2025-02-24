import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// 배너 이미지 (본인 경로에 맞게 수정)
import bannerImage from '../assets/Bannerimg/DefaultBanner.png';

const BannerBar = () => {
  return (
    <View style={styles.container}>
      <Image source={bannerImage} style={styles.banner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 361,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // 중앙 정렬
    marginVertical: 10, // 위아래 여백 추가
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지 비율 유지
  },
});

export default BannerBar;
