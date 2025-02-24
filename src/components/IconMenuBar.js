import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// 아이콘 예시 (본인 경로로 수정하세요)
import ClockIcon from '../assets/svg/ClockIcon.png';
import CalendarIcon from '../assets/svg/CalendarIcon.png';
import Address from '../assets/svg/Address.png';
import Category from '../assets/svg/Category.png';

const IconMenuBar = () => {
  return (
    <View style={styles.container}>
      {/* 1. 다가오는 공연 */}
      <View style={styles.iconItem}>
        <View style={styles.iconWrapper}>
          <Image source={ClockIcon} style={styles.icon} />
        </View>
        <Text style={styles.iconLabel}>다가오는 공연</Text>
      </View>

      {/* 2. 공연 달력 */}
      <View style={styles.iconItem}>
        <View style={styles.iconWrapper}>
          <Image source={CalendarIcon} style={styles.icon} />
        </View>
        <Text style={styles.iconLabel}>공연 달력</Text>
      </View>

      {/* 3. 지역별 공연 */}
      <View style={styles.iconItem}>
        <View style={styles.iconWrapper}>
          <Image source={Address} style={styles.icon} />
        </View>
        <Text style={styles.iconLabel}>지역별 공연</Text>
      </View>

      {/* 4. 장르별 공연 */}
      <View style={styles.iconItem}>
        <View style={styles.iconWrapper}>
          <Image source={Category} style={styles.icon} />
        </View>
        <Text style={styles.iconLabel}>장르별 공연</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로 배치
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 60, // 원 크기
    height: 60,
    borderRadius: 30, // 원형 처리
    backgroundColor: '#fff', // 흰색 배경
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 40,   // 아이콘 크기
    height: 40,
    resizeMode: 'contain',
  },
  iconLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginTop: 5,
  },
});

export default IconMenuBar;
