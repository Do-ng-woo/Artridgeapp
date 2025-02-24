import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import ArticleMainCard from './ArticleMainCard';

const { width } = Dimensions.get('window');

const CarouselContainer = ({ articles }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % articles.length;
        console.log(`⏩ Auto-scrolling to Index: ${nextIndex}`);

        if (carouselRef.current) {
          carouselRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ArticleMainCard 
        id={item.id}
        title={item.title}
        date={item.date}
        location={item.location}
        artists={item.artists}
        image={item.image}
      />
    </View>
  );

  return (
    <View style={styles.carouselWrapper}>
      {console.log("🎡 Rendering FlatList Carousel...")}
      <FlatList
        ref={carouselRef}
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

// ✅ 스타일 설정
const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  cardWrapper: {
    width: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CarouselContainer;
