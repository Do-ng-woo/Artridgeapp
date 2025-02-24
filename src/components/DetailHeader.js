import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ 네비게이션 훅
import ArrowBackIos from '../assets/svg/Arrowback.png';

const DetailHeader = ( ) => {
  const navigation = useNavigation(); // ✅ 네비게이션 객체 가져오기

  return (
    <View style={styles.headerContainer}>
      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
         <Image source={ArrowBackIos} />
      </TouchableOpacity>

      {/* 📝 페이지 제목 */}
      <Text style={styles.headerTitle}>상세정보</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center', // 제목을 중앙 정렬
  },
  backButton: {
    position: 'absolute', // 절대 위치 지정
    left: 4, // 왼쪽 끝에 배치
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});

export default DetailHeader;
