import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PosterImage from '../assets/Articleimg/Poster.jpg'; // ✅ 포스터 이미지 가져오기

const ArticleMainCard = ({ 
  title = "공연 제목", 
  date = "YYYY.MM.DD", 
  location = "공연장", 
  image = null, // ✅ 이미지 prop 추가
  artists = [],
}) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      onPress={() => {
        console.log('🔗 Navigating to ArticleDetailScreen with:', { title, date, location, image, artists});
        navigation.navigate('ArticleDetailScreen', { title, date, location, image, artists });
      }}
    >
      <View style={styles.root}>
        {/* ✅ Rectangle2 역할을 하는 배경 View */}
        <View style={styles.background} />

        {/* ✅ 중앙 정렬된 포스터 */}
        <View style={styles.posterContainer}>
          <Image source={PosterImage} style={styles.poster} />
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
    backgroundColor: '#2C2C2C', // ✅ Rectangle2 배경색 적용
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
    ...StyleSheet.absoluteFillObject, // ✅ 전체 배경 View (Rectangle2 대체)
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
  },
  posterContainer: {
    position: 'absolute',
    top: 14, // ✅ 위에서 14px 떨어진 위치
    width: 183,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 180,
    height: 240,
    borderRadius: 10, // ✅ 모서리 둥글게 설정 (선택 사항)
    resizeMode: 'cover',
  },
  title: {
    marginTop: 250, // ✅ 포스터 아래에 여백 추가
    width: 244,
    height: 50,
    flexShrink: 0,
    color: '#FFFFFF',
    fontFamily: 'Inter',
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
    backgroundColor: '#444', // ✅ 어두운 배경과 어울리도록 수정
  },
  artistText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ArticleMainCard;
