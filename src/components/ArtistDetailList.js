import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

// 기본 아티스트 이미지
import DefaultArtist from '../assets/Artistimg/DefaultArtist.png';

const { width } = Dimensions.get('window'); // 화면 너비 가져오기

const ArtistDetailList = ({ artists = [] }) => {
  const renderItem = ({ item }) => (
    <View style={styles.artistContainer}>
      {/* 아티스트 이미지 */}
      <Image source={item.image ? { uri: item.image } : DefaultArtist} style={styles.artistImage} />
      {/* 아티스트 이름 */}
      <Text style={styles.artistName}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>아티스트</Text>
      <FlatList
        data={artists}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal // ✅ 가로 스크롤 활성화
        showsHorizontalScrollIndicator={false} // 스크롤 바 숨김
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// 📌 스타일 설정
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF', // 연한 핑크 배경
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginLeft: 16,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  artistContainer: {
    alignItems: 'center',
    marginRight: 20, // 아티스트 아이템 간격 조정
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // ✅ 원형 이미지 적용
    backgroundColor: '#FFFFFF',
    resizeMode: 'cover',
  },
  artistName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});

export default ArtistDetailList;
