import React, { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import MainHeader from '../components/MainHeader';
import IconMenuBar from '../components/IconMenuBar';
import BannerBar from '../components/BannerBar';
import StageMainCard from '../components/StageMainCard';
import ArtistMainCard from '../components/ArtistMainCard';
import { articles, stageData, artistData } from '../testdata/testdata1';
import CarouselContainer from '../components/CarouselContainer'; // ✅ 새로 만든 캐러셀 컨테이너

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <MainHeader />

        {/* ✅ 가로 슬라이드 캐러셀 */}
        <CarouselContainer articles={articles} />

        <IconMenuBar />
        <BannerBar /> 

        <View>
          <Text style={styles.Title_H2}>인기 공연장</Text>
        </View>
        <View style={styles.StageCardWrapper}>
          {stageData.slice(0, 4).map((stage, index) => (
            <StageMainCard
              key={index}
              image={stage.image}
              name={stage.name}
              location={stage.location}
              tags={stage.tags}
            />
          ))}
        </View>

        <View>
          <Text style={styles.Title_H2}>인기 아티스트</Text>
        </View>
        <View style={styles.ArtistcardWrapper}>
          {artistData.slice(0, 4).map((artist, index) => (
            <ArtistMainCard
              key={index}
              image={artist.image}
              name={artist.name}
              tags={artist.tags}
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
  ArtistcardWrapper: {
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
});

export default HomeScreen;
