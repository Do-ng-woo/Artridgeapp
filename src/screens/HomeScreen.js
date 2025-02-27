import React from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useHomeData from '../hooks/useHomeData';  // ✅ API 데이터 가져오는 훅
import MainHeader from '../components/MainHeader';
import IconMenuBar from '../components/IconMenuBar';
import BannerBar from '../components/BannerBar';
import StageMainCard from '../components/StageMainCard';
import ArtistMainCard from '../components/ArtistMainCard';
import CarouselContainer from '../components/CarouselContainer';

const HomeScreen = () => {
  const { data, loading, error } = useHomeData();

  console.log("🎡 홈 화면에서 받은 데이터:", data.latest_articles);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>데이터를 불러오는 중 오류 발생</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <MainHeader />

        {/* ✅ 가로 슬라이드 캐러셀 */}
        <CarouselContainer articles={data.latest_articles} />

        <IconMenuBar />
        <BannerBar />

        <View>
          <Text style={styles.Title_H2}>인기 공연장</Text>
        </View>
        <View style={styles.StageCardWrapper}>
          {data.popular_projects.slice(0, 4).map((stage, index) => (
            <StageMainCard
              key={stage.id}
              id={stage.id}
              image={stage.image}
              name={stage.name} // ✅ 프로젝트(공연장) 이름 반영
              location={stage.location} // ✅ 주소 반영
              tags={stage.tags} // ✅ 빈 리스트 유지
            />
          ))}
        </View>

        <View>
          <Text style={styles.Title_H2}>인기 아티스트</Text>
        </View>
        <View style={styles.ArtistCardWrapper}>
          {data.popular_artists.slice(0, 4).map((artist, index) => (
            <ArtistMainCard
              key={artist.id}
              id={artist.id}
              image={artist.image}
              name={artist.name} // ✅ 아티스트 이름 반영
              tags={artist.tags} // ✅ 빈 리스트 유지
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


// ✅ 스타일 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  StageCardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  ArtistCardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 60,
    gap: 15,
  },
  Title_H2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
    color: '#333333',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 50,
  },
});

export default HomeScreen;
