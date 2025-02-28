import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// 별점 아이콘 (본인 프로젝트 경로에 맞게 설정)
import FillGrade from '../assets/svg/FillGrade.png';
import EmptyGrade from '../assets/svg/EmptyGrade.png';

// 🎭 공연 카드 컴포넌트
const ArticleUserCard = ({ image, title, date, rating }) => {
  // ✅ 이미지 URL 유효성 검사 후 처리
  const imageSource = typeof image === 'string' && image.startsWith('http')
    ? { uri: image }
    : require('../assets/Profileimg/default_profile.jpg');

  return (
    <View style={styles.cardContainer}>
      {/* 공연 이미지 */}
      <Image source={imageSource} style={styles.image} />

      {/* 공연 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.date}>{date || "날짜 미정"}</Text>

        {/* 별점 표시 */}
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Image 
              key={index} 
              source={index < rating ? FillGrade : EmptyGrade} 
              style={styles.starIcon} 
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 173,
    height: 349,
    backgroundColor: '#2C2C2C',
    borderRadius: 12, // ✅ 둥근 모서리 추가
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 173,
    height: 241,
    borderTopLeftRadius: 12, // ✅ 이미지도 둥근 모서리 적용
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  infoContainer: {
    width: 165,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'left',
    width: 165,
    height: 45, // ✅ 높이 조정
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CCC',
    width: 165,
    height: 15,
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 2,
    resizeMode: 'contain',
  },
});

export default ArticleUserCard;
