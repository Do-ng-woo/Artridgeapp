import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DefaultPoster from '../assets/Articleimg/Poster.jpg'; // ✅ 로컬 기본 이미지

const ArticleMainCard = ({ 
  id,
  title = "공연 제목", 
  date = "YYYY.MM.DD", 
  location = "공연장", 
  image = null, // ✅ 이미지 prop 추가
  artists = [],
}) => {
  const navigation = useNavigation();

  // ✅ 이미지 URL 설정 (기본 이미지 vs 네트워크 이미지)
  const imageUrl = image ? { uri: image } : DefaultPoster;

  console.log(`📸 ArticleMainCard에서 받은 이미지 URL (Title: ${image}):`, image);

  return (
    <TouchableOpacity 
      onPress={() => {
        console.log('🔗 Navigating to ArticleDetailScreen with ID:', id);
        navigation.navigate('ArticleDetailScreen', { articleId: id }); // ✅ ID 추가 전달
      }}
    >
      <View style={styles.root}>
        {/* ✅ Rectangle2 역할을 하는 배경 View */}
        <View style={styles.background} />

        {/* ✅ 중앙 정렬된 포스터 */}
        <View style={styles.posterContainer}>
          <Image source={imageUrl} style={styles.poster} />
        </View>

        {/* ✅ 공연 정보 */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.location}>{location}</Text>

        {/* ✅ 아티스트 목록 */}
        <View style={styles.artistsContainer}>
          {artists.map((artist, index) => (
            <View key={index} style={styles.artistBox}>
              <Text style={styles.artistText}>{artist}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 📌 스타일 설정
const styles = StyleSheet.create({
  root: {
    width: 267,
    height: 420,
    flexShrink: 0,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
  },
  posterContainer: {
    position: 'absolute',
    top: 14,
    width: 183,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 180,
    height: 240,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 250,
    width: 244,
    height: 50,
    flexShrink: 0,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  date: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
  },
  location: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
  },
  artistsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'center',
  },
  artistBox: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#444',
  },
  artistText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ArticleMainCard;
