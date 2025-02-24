import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import BannerBar from '../components/BannerBar';
import CarouselContainer from '../components/CarouselContainer';
import { articles } from '../testdata/testdata1';
// 기본 아티스트 이미지
import DefaultArtistImage from '../assets/Artistimg/DefaultArtist.png';

const ArtistDetailScreen = ({ route }) => {
  const { name } = route.params || {};

  return (
    <View style={styles.container}>
      <DetailHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 아티스트 이미지 */}
        <Image source={DefaultArtistImage} style={styles.artistImage} />

        {/* 아티스트 이름 */}
        <View style={styles.textContainer}>
            <Text style={styles.artistName}>{name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  artistImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
    marginBottom: 70, //
  },
});

export default ArtistDetailScreen;
