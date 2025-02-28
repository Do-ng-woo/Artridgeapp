import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// ✅ 아이콘 및 이미지 추가
import ShareIcon from '../assets/svg/Share.png';
import MenuIcon from '../assets/svg/Menu.png';
import LevelFlag from '../assets/Profileimg/LevelFlag.png'; // 깃발 이미지

const ProfileCard = ({ name = "사용자", profileImage, stats = [] }) => { 
  const [modalVisible, setModalVisible] = useState(false); // ✅ 팝업 상태
  const navigation = useNavigation();

  // 🔑 로그아웃 함수
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken'); // ✅ 저장된 토큰 삭제
    navigation.replace('LoginMainScreen'); // ✅ 로그인 화면으로 이동
  };

  return (
    <View style={styles.profileContainer}>
      {/* 상단 공유 및 메뉴 아이콘 */}
      <View style={styles.headerIcons}>
        <Image source={ShareIcon} style={styles.icon} />
        <TouchableOpacity onPress={() => setModalVisible(true)}> 
          <Image source={MenuIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 🔥 깃발 추가 (왼쪽 상단) */}
      <Image source={LevelFlag} style={styles.LevelFlag} />

      {/* ✅ 프로필 이미지 렌더링 개선 */}
      <Image 
        source={profileImage ? { uri: profileImage } : require('../assets/Profileimg/default_profile.jpg')} 
        style={styles.profileImage} 
        onError={(e) => console.log("❌ 이미지 로드 실패", e.nativeEvent.error)}
      />

      {/* ✅ 사용자 이름이 존재하는 경우만 표시 */}
      {name && <Text style={styles.userName}>{name}</Text>}

      {/* ✅ 통계 데이터 렌더링 (stats가 배열이 아닐 경우 빈 배열 처리) */}
      <View style={styles.statsContainer}>
        {(stats.length > 0 ? stats : [{ label: "데이터 없음", value: "-" }]).map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* ✅ 로그아웃 팝업 */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} /> 
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>정말 로그아웃 하시겠습니까?</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>로그아웃</Text> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    height: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: '#ddd',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    width: '80%',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileCard;
