import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 예제 이미지 (props로 대체 가능)
import defaultImage from '../assets/Articleimg/Poster.jpg';

const ArticleListCard = ({ id,image, title, location, date, artists }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => {
        console.log(`🔗 Navigating to ArticleDetailScreen with ID: ${id}`);
        navigation.navigate('ArticleDetailScreen', { articleId: id }); // ✅ ID 전달
      }}
    >
      <View style={styles.cardContainer}>
        {/* ✅ 공연 포스터 */}
        <Image source={image ? { uri: image } : defaultImage} style={styles.image} />

        {/* ✅ 공연 정보 */}
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
          {location}
        </Text>
        <Text style={styles.date}>{date}</Text>

        {/* ✅ 아티스트 목록 */}
        <View style={styles.artistContainer}>
          {(Array.isArray(artists) ? artists : []).map((artist, index) => (
            <View key={index} style={styles.artistTag}>
              <Text style={styles.artistText} numberOfLines={1} ellipsizeMode="tail">
                {artist.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 173,
    height: 398,
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden', // ✅ 카드 밖으로 넘치는 요소 숨김
  },
  image: {
    width: 173,
    height: 241,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    width: 165,
    height: 45,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    overflow: 'hidden', // ✅ 넘치는 텍스트 숨김
  },
  location: {
    width: 165,
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    overflow: 'hidden', // ✅ 넘치는 텍스트 숨김
  },
  date: {
    width: 165,
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  artistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden', // ✅ 아티스트 리스트도 넘치면 숨김
  },
  artistTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#444',
    overflow: 'hidden', // ✅ 아티스트 태그 내부 텍스트 넘치면 숨김
  },
  artistText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden', // ✅ 아티스트 이름이 넘칠 경우 숨김
  },
});

export default ArticleListCard;
