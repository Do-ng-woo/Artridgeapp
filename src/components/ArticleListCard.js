import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 예제 이미지 (props로 대체 가능)
import defaultImage from '../assets/Articleimg/Poster.jpg';

const ArticleListCard = ({ image, title, location, date, artists }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => {
        console.log('🔗 Navigating to ArticleDetailScreen with:', { title, date, location, image, artists });
        navigation.navigate('ArticleDetailScreen', { title, date, location, image, artists });
      }}
    >
      <View style={styles.cardContainer}>
        {/* ✅ 공연 포스터 */}
        <Image source={image ? { uri: image } : defaultImage} style={styles.image} />

        {/* ✅ 공연 정보 */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>

        {/* ✅ 아티스트 목록 */}
        <View style={styles.artistContainer}>
          {artists.map((artist, index) => (
            <View key={index} style={styles.artistTag}>
              <Text style={styles.artistText}>{artist}</Text>
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
  },
  location: {
    width: 165,
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
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
  },
  artistTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 3,
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

export default ArticleListCard;
