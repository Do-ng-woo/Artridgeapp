import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 기본 이미지 (로컬)
import exampleImage from '../assets/Artistimg/DefaultArtist.png';

const ArtistMainCard = ({ id, image, name, tags }) => { // ✅ ID 추가
  const navigation = useNavigation();

  // ✅ 이미지 URL이 있으면 네트워크에서 불러오고, 없으면 기본 이미지 사용
  const imageSource = image ? { uri: image } : exampleImage;

  return (
    <TouchableOpacity 
      onPress={() => {
        console.log(`🔗 Navigating to ArtistDetailScreen with ID: ${id}`);
        navigation.navigate('ArtistDetailScreen', { artistId: id }); // ✅ ID 전달
      }}
    >
      <View style={styles.cardContainer}>
        {/* 아티스트 이미지 & 태그 포함 */}
        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} />

          {/* 태그 리스트 (현재는 빈 리스트 반환이므로 렌더링 X) */}
          {tags.length > 0 && (
            <View style={styles.tagContainer}>
              {tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 아티스트 이름 */}
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 173,
    height: 227,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 10,
    marginleft:0
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 173,
    height: 173,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    bottom: 10,
    left: '50%', // 가운데 정렬을 위한 설정
    transform: [{ translateX: -50 }], // 정확한 중앙 배치
    flexDirection: 'row',
    justifyContent: 'center', // 태그 내부 아이템 정렬
    alignSelf: 'center', // 부모 요소 기준으로 중앙 정렬
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 3, // 태그 간격 조정
  },
  
  tagText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
});

export default ArtistMainCard;
