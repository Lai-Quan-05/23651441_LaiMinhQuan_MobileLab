import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// =========================================================================================
// HƯỚNG DẪN DÀNH CHO GIẢNG VIÊN CHẤM BÀI:
// - Thầy có thể bấm các nút chọn "Bài 1" -> "Bài 8" trên màn hình app để xem kết quả trực tiếp.
// - Hoặc thầy có thể comment/uncomment trực tiếp các import dưới đây để kiểm tra từng file:
// =========================================================================================

import Bai1 from '../week1/Bai1_UserCard';
import Bai2 from '../week1/Bai2_Counter';
import Bai3 from '../week1/Bai3_TodoListBasic';
import Bai4 from '../week1/Bai4_CustomButton';
import Bai5 from '../week1/Bai5_LiveInput';
import Bai6 from '../week1/Bai6_LoadingWrapper';
import Bai7 from '../week1/Bai7_GenderSelector';
import Bai8 from '../week1/Bai8_AppButton';

export default function Index() {
  const [selectedLesson, setSelectedLesson] = useState<number>(1);

  const renderLesson = () => {
    switch (selectedLesson) {
      case 1: return <Bai1 />;
      case 2: return <Bai2 />;
      case 3: return <Bai3 />;
      case 4: return <Bai4 />;
      case 5: return <Bai5 />;
      case 6: return <Bai6 />;
      case 7: return <Bai7 />;
      case 8: return <Bai8 />;
      default: return <Bai1 />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TUẦN 1 - LẠI MINH QUÂN - 23651441</Text>
        <Text style={styles.subTitle}>Chọn bài tập phía dưới để chấm:</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuBar}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.btnMenu,
                selectedLesson === num && styles.btnActive
              ]}
              onPress={() => setSelectedLesson(num)}
            >
              <Text style={[
                styles.txtMenu,
                selectedLesson === num && styles.txtActive
              ]}>
                Bài {num}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text style={styles.lessonTitle}>--- ĐANG CHẠY: BÀI {selectedLesson} ---</Text>
        <ScrollView style={styles.screenView}>
          {renderLesson()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 35,
  },
  header: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
    textAlign: 'center',
  },
  menuBar: {
    flexDirection: 'row',
    marginTop: 6,
  },
  btnMenu: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginRight: 8,
  },
  btnActive: {
    backgroundColor: '#4f46e5',
  },
  txtMenu: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  txtActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  lessonTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  screenView: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  }
});