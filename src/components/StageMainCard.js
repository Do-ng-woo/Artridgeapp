import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 기본 공연장 이미지 (로컬)
import exampleImage from '../assets/Stageimg/DefaultStage.png';

const StageMainCard = ({ id, image, name, location, tags = [] }) => {
  const navigation = useNavigation();

  // ✅ 이미지 URL이 있으면 네트워크에서 불러오고, 없으면 기본 이미지 사용
  const imageSource = image ? { uri: image } : exampleImage;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('🔗 Navigating to StageDetailScreen with ID:', id);
        navigation.navigate('StageDetailScreen', { stageId: id }); // ✅ ID 추가 전달
      }}
    >
      <View style={styles.cardContainer}>
        {/* 공연장 이미지 */}
        <Image source={imageSource} style={styles.image} />

        {/* 공연장 이름 */}
        <Text style={styles.name}>{name}</Text>

        {/* 지역 정보 */}
        <Text style={styles.location}>{location}</Text>

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 173,
    height: 220,
    backgroundColor: '#222', // 카드 배경색
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 0,
  },
  image: {
    width: 173,
    height: 123,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  location: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#444', // 태그 배경색
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default StageMainCard;
