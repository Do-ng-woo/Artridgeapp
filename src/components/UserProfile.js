import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// ✅ 아이콘 및 이미지 추가
import ShareIcon from '../assets/svg/Share.png';
import MenuIcon from '../assets/svg/Menu.png';
import LevelFlag from '../assets/Profileimg/LevelFlag.png'; // 깃발 이미지

const ProfileCard = ({ name, profileImage, stats }) => {
  return (
    <View style={styles.profileContainer}>
      {/* 상단 공유 및 메뉴 아이콘 */}
      <View style={styles.headerIcons}>
        <Image source={ShareIcon} style={styles.icon} />
        <Image source={MenuIcon} style={styles.icon} />
      </View>

      {/* 🔥 깃발 추가 (왼쪽 상단) */}
      <Image source={LevelFlag} style={styles.LevelFlag} />

      {/* 프로필 이미지 */}
      <Image source={profileImage} style={styles.profileImage} />

      {/* 사용자 이름 */}
      <Text style={styles.userName}>{name}</Text>

      {/* 통계 데이터 (내 공연, 스크랩, 작성한 글, 활동 등) */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    position: 'relative', // 리본 배치용
    borderBottomWidth: 1, // ✅ 아랫부분 테두리 두께 3
    borderBottomColor: '#000', // ✅ 테두리 색상 (검정)
  },
  headerIcons: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    height:40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent:'flex-end',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  LevelFlag: {
    position: 'absolute',
    top: 0,
    left: 16,
    width: 70,
    height: 130,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    width: '25%',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileCard;
