import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// 별점 아이콘 (본인 프로젝트 경로에 맞게 설정)
import FillGrade from '../assets/svg/FillGrade.png';
import EmptyGrade from '../assets/svg/EmptyGrade.png';

// 공연 카드 컴포넌트
const ArticleUserCard = ({ image, title, date, rating }) => {
  return (
    <View style={styles.cardContainer}>
      {/* 공연 이미지 */}
      <Image source={image} style={styles.image} />

      {/* 공연 정보 */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.date}>{date}</Text>

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
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 173,
    height: 241,
    resizeMode: 'cover',
  },
  infoContainer: {
    width: 165,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'left',
    width: 165,
    height: 45,
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
    marginTop: 5,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 2,
    resizeMode: 'contain',
  },
});

export default ArticleUserCard;
