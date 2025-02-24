import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import ArtistDetailList from '../components/ArtistDetailList'; // ✅ 아티스트 리스트 추가
import BannerBar from '../components/BannerBar';
// 기본 이미지 설정
import DefaultPoster from '../assets/Articleimg/Poster.jpg';

const ArticleDetailScreen = ({ route }) => {
  // ✅ props로 데이터 전달받기
  const { title, date, location, image, artists } = route.params || {};

  return (
    <View style={styles.container}>
      {/* 🔹 상세 정보 헤더 */}
      <DetailHeader />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 🎭 공연 포스터 */}
        <Image source={image ? { uri: image } : DefaultPoster} style={styles.poster} />

        {/* 📌 공연 정보 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>시간: <Text style={styles.boldText}>{date}</Text></Text>
          <Text style={styles.location}>장소: <Text style={styles.boldText}>{location}</Text></Text>
        </View>

        {/* 🎤 공연 아티스트 목록 */}
        <ArtistDetailList artists={artists} /> 
        <BannerBar/>
        <View style={styles.emptyspace}></View>
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
    paddingBottom: 20, // 스크롤 시 여유 공간 추가
  },
  poster: {
    width: '100%', 
    height: 550, // ✅ 포스터 높이 고정
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 32,
  },
  date: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
    marginTop: 10,
  },
  location: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyspace : {
    height: 50, // ✅ 비어��는 공간 추가
  },
});

export default ArticleDetailScreen;
