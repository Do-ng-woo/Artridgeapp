import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import ProfileCard from '../components/UserProfile';
import ArticleUserCard from '../components/ArticleUserCard';
import { profileData, performanceData } from '../testdata/testdata1';

const { width } = Dimensions.get('window'); // ✅ 화면 너비 가져오기

const ProfileScreen = () => {
  // ✅ 특정 유저 ID(101)인 공연만 필터링
  const userPerformances = performanceData.filter(
    (item) => item.userId === 101 && item.userRating !== null
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ 프로필 카드 */}
      <ProfileCard 
        name={profileData.name}
        profileImage={profileData.profileImage}
        stats={profileData.stats}
      />

      {/* ✅ 버튼 컨테이너 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>
            전체보기 ({profileData.stats[0].value}) ▼
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stampButton}>
          <Text style={styles.stampText}>스템프 보기</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ 유저가 평가한 공연 리스트 (2열 배치) */}
      <View style={styles.gridContainer}>
        {userPerformances.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <ArticleUserCard 
              image={item.image}
              title={item.title}
              date={item.date}
              rating={item.userRating} // 유저가 평가한 별점
            />
          </View>
        ))}
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
    flexWrap: 'wrap', // ✅ 2열 배치를 위해 래핑
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridItem: {
    width: (width / 2) - 24, // ✅ 2열 배치 설정
    marginBottom: 16,
  },
});

export default ProfileScreen;
