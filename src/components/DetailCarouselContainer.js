import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import ArticleMainCard from './ArticleMainCard';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;  // ✅ 카드 너비 설정
const SPACER_WIDTH = (width - ITEM_WIDTH) / 2; // ✅ 양쪽 빈 공간 계산

const DetailCarouselContainer = ({ articles, initialSlideIndex = 0 }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);

  // ✅ 앞뒤로 공간을 추가하기 위해 더미 데이터 삽입
  const paddedArticles = [{ id: 'left-spacer' }, ...articles, { id: 'right-spacer' }];

  useEffect(() => {
    if (carouselRef.current && articles.length > 0) {
      setTimeout(() => {
        carouselRef.current?.scrollToIndex({ index: initialSlideIndex + 1, animated: false });
      }, 100);
    }
  }, [initialSlideIndex, articles]);

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollToIndex({ index: nextIndex + 1, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      carouselRef.current?.scrollToIndex({ index: prevIndex + 1, animated: true });
    }
  };

  const renderItem = ({ item, index }) => {
    // ✅ 왼쪽, 오른쪽 여백을 위한 빈 공간 렌더링
    if (item.id === 'left-spacer' || item.id === 'right-spacer') {
      return <View style={{ width: SPACER_WIDTH }} />;
    }

    return (
      <View style={styles.cardWrapper}>
        <ArticleMainCard 
          id={item.id}
          title={item.title}
          date={item.date}
          location={item.location}
          artists={item.artists.map(artist => artist.name)}  
          image={item.image}
        />
      </View>
    );
  };

  return (
    <View style={styles.carouselWrapper}>
      {/* 좌측 버튼 */}
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.leftButton} onPress={handlePrev}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
      )}

      {/* 슬라이더 */}
      <FlatList
        ref={carouselRef}
        data={paddedArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        initialScrollIndex={initialSlideIndex + 1}  // ✅ 패딩 추가로 인해 +1 처리
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />

      {/* 우측 버튼 */}
      {currentIndex < articles.length - 1 && (
        <TouchableOpacity style={styles.rightButton} onPress={handleNext}>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ✅ 스타일 설정
const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 10,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 10,
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailCarouselContainer;
