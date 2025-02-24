import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import ArtistDetailList from '../components/ArtistDetailList';
import BannerBar from '../components/BannerBar';
import DefaultPoster from '../assets/Articleimg/Poster.jpg';
import useArticleDetail from '../hooks/useArticleDetail';

const ArticleDetailScreen = ({ route }) => {
  const { articleId } = route.params || {};
  const { data, loading, error } = useArticleDetail(articleId);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>데이터를 불러오는 중 오류 발생</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔹 상세 정보 헤더 */}
      <DetailHeader />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* 🎭 공연 포스터 */}
        <Image source={data.image ? { uri: data.image } : DefaultPoster} style={styles.poster} />

        {/* 📌 공연 정보 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>시간: <Text style={styles.boldText}>{data.date}</Text></Text>
          <Text style={styles.location}>장소: <Text style={styles.boldText}>{data.location}</Text></Text>
        </View>

        {/* 🎤 공연 아티스트 목록 */}
        <ArtistDetailList artists={data.artists} /> 


        {/* 💬 댓글 리스트 */}
        <View>
          <Text style={styles.commentTitle}>댓글</Text>
          {data.comments.length > 0 ? (
            data.comments.map((comment, index) => (
              <View key={index} style={styles.commentBox}>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentText}>아직 댓글이 없습니다.</Text>
          )}
        </View>

        <BannerBar />
        <View style={styles.emptyspace}></View>
      </ScrollView>
    </View>
  );
};

// ✅ 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  poster: {
    width: '100%', 
    height: 550,
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 32,
  },
  date: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
    marginTop: 10,
  },
  location: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 20,
  },
  commentBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
  },
  commentText: {
    fontSize: 16,
  },
  noCommentText: {
    fontSize: 16,
    color: '#777',
    marginLeft: 16,
    marginTop: 10,
  },
  emptyspace: {
    height: 50,
  },
});

export default ArticleDetailScreen;
