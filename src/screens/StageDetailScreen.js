import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import CarouselContainer from '../components/CarouselContainer';
import { articles } from '../testdata/testdata1';
import BannerBar from '../components/BannerBar';

// 기본 이미지
import DefaultStageImage from '../assets/Stageimg/DefaultStage.png';

const StageDetailScreen = ({ route }) => {
  const { name, location } = route.params || {};

  return (
    <View style={styles.container}>
      <DetailHeader />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 🎭 공연장 이미지 */}
        <View style={styles.imageWrapper}>
          <Image source={DefaultStageImage} style={styles.stageImage} />
        </View>

        {/* 📌 공연장 정보 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <BannerBar />
        {/* 🔹 관련 공연 캐러셀 */}
        <View style={styles.carouselWrapper}>
            <Text style={styles.carouselTitle}>관련 공연</Text>
          <CarouselContainer articles={articles} />
        </View>
      </ScrollView>
    </View>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  stageImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center', // ✅ 텍스트 중앙 정렬
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  carouselWrapper: {
    width: '100%', // ✅ 가로 크기 강제 설정
    marginTop: 20, // ✅ 여백 추가해서 자연스럽게 정렬
    marginBottom: 50, //
  },
});

export default StageDetailScreen;
