import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

// 기본 아티스트 이미지
import DefaultArtist from '../assets/Artistimg/DefaultArtist.png';

const { width } = Dimensions.get('window'); // 화면 너비 가져오기

const ArtistDetailList = ({ artists = [] }) => {
  const renderItem = ({ item }) => (
    <View style={styles.artistContainer}>
      {/* 아티스트 이미지 */}
      <Image 
        source={item.image ? { uri: item.image } : DefaultArtist} 
        style={styles.artistImage} 
      />
      {/* 아티스트 이름 */}
      <Text style={styles.artistName}>{item.name || ""}</Text> 
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>출연 아티스트</Text>
      {artists.length > 0 ? (
        <FlatList
          data={artists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // ✅ 고유 ID를 키로 사용
          horizontal // ✅ 가로 스크롤 활성화
          showsHorizontalScrollIndicator={false} // 스크롤 바 숨김
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noArtists}>출연 아티스트 정보 없음</Text> // ✅ 아티스트가 없을 때 메시지 표시
      )}
    </View>
  );
};

// 📌 스타일 설정
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
  noArtists: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ArtistDetailList;
