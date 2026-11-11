import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { loginFake, logout } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/index';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.center}>
          <Text style={styles.text}>Xin chào, {user?.name}!</Text>
          <Text style={styles.subText}>{user?.email}</Text>
          <TouchableOpacity style={[styles.btn, styles.logoutBtn]} onPress={() => dispatch(logout())}>
            <Text style={styles.btnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.text}>Bạn chưa đăng nhập</Text>
          <TouchableOpacity style={styles.btn} onPress={() => dispatch(loginFake())}>
            <Text style={styles.btnText}>Đăng nhập (Dữ liệu giả)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  subText: { fontSize: 14, color: '#666', marginBottom: 16 },
  btn: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 },
  logoutBtn: { backgroundColor: '#FF3B30' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});