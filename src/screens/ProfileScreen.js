import React from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import ProfileCard from '../components/UserProfile';
import ArticleUserCard from '../components/ArticleUserCard';
import useUserProfile from '../hooks/useUserProfile'; // ✅ 유저 정보 가져오기

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { user, performances, loading, error } = useUserProfile(); // ✅ 유저 정보 및 공연 데이터 가져오기

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />;
  }

  if (error || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>유저 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ 프로필 카드 */}
      <ProfileCard 
        name={user.nickname}
        profileImage={ user.image } // ✅ 이미지 URL 적용
        stats={[
          { label: "작성한 글", value: user.post_count },
          { label: "활동", value: user.comment_count },
          { label: "레벨", value: user.level },
          { label: "포인트", value: user.points },
        ]}
      />

      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>
            전체보기 ({user.myPerformances}) ▼
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stampButton}>
          <Text style={styles.stampText}>스템프 보기</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ 유저가 평가한 공연 리스트 */}
      <View style={styles.gridContainer}>

        {performances.length > 0 ? (
          performances.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <ArticleUserCard 
                image={item.article_image ? item.article_image : require('../assets/Profileimg/default_profile.jpg')}
                title={item.article_title}
                date={item.article_date}
                rating={item.rating}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>아직 평가한 공연이 없습니다.</Text>
        )}
      </View>
    </ScrollView>
  );
};

// ✅ 스타일 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  loader: {
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
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopColor: '#000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '700',
  },
  stampButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  stampText: {
    fontSize: 14,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 14,
    color: '#888',
  },
  gridItem: {
    width: (width / 2) - 24, // ✅ 2열 배치 설정
    marginBottom: 16,
  },
});

export default ProfileScreen;
