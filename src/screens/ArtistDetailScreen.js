import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import DetailCarouselContainer from '../components/DetailCarouselContainer';
import BannerBar from '../components/BannerBar';
import useArtistDetail from '../hooks/useArtistDetail'; // ✅ 훅 추가
import DefaultArtistImage from '../assets/Artistimg/DefaultArtist.png';

const ArtistDetailScreen = ({ route }) => {
  const { artistId } = route.params || {};
  const { data: artist, loading, error } = useArtistDetail(artistId); // ✅ API 호출

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  if (error || !artist) {
    return (
      <View style={styles.errorContainer}>
        <Text>데이터를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  console.log("🎵 Fetched artist.articles data:", artist.articles);

  return (
    <View style={styles.container}>
      <DetailHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 아티스트 이미지 */}
        <Image source={artist.image ? { uri: artist.image } : DefaultArtistImage} style={styles.artistImage} />

        {/* 아티스트 이름 & 설명 */}
        <View style={styles.textContainer}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.description}>{artist.description}</Text>
        </View>


        <View style={styles.carouselWrapper}>
          <Text style={styles.carouselTitle}>관련 공연</Text>
          <DetailCarouselContainer articles={artist.articles} 
                                   initialSlideIndex={artist.initial_slide_index || 0} // ✅ 존재하면 사용, 없으면 0
          />
        </View>
        {/* 하단 배너 */}
        <BannerBar />
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
  artistImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 16,
    alignItems: 'center',
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginTop: 20,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  carouselWrapper: {
    width: '100%',
    marginTop: 20,
    marginBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArtistDetailScreen;
