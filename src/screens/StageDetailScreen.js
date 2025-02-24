import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import CarouselContainer from '../components/CarouselContainer';
import BannerBar from '../components/BannerBar';
import useStageDetail from '../hooks/useStageDetail'; // ✅ 공연장 정보 훅 가져오기

// 기본 이미지
import DefaultStageImage from '../assets/Stageimg/DefaultStage.png';

const StageDetailScreen = ({ route }) => {
  const { stageId } = route.params || {};
  const { data: stage, loading, error } = useStageDetail(stageId); // ✅ API 요청

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>공연장 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>오류 발생: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DetailHeader />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 🎭 공연장 이미지 */}
        <View style={styles.imageWrapper}>
          <Image 
            source={stage.image ? { uri: stage.image } : DefaultStageImage} 
            style={styles.stageImage} 
          />
        </View>

        {/* 📌 공연장 정보 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{stage.name}</Text>
          <Text style={styles.location}>{stage.location}</Text>
          <Text style={styles.stats}>👍 좋아요 {stage.like} | 👀 조회수 {stage.views}</Text>
        </View>



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
    alignItems: 'center',
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
  stats: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default StageDetailScreen;
