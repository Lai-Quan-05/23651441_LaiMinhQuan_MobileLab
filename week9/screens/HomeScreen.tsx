// HomeScreen.tsx
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BOOKS = [
  { bookId: 'b1', name: 'Đắc Nhân Tâm', price: 100000 },
  { bookId: 'b2', name: 'Nhà Giả Kim', price: 85000 },
  { bookId: 'b3', name: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', price: 90000 },
];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={BOOKS}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.bookId, name: item.name, price: item.price })}
          >
            <Text style={styles.bookTitle}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// BookDetailScreen.tsx
import { useCart } from '../hooks/useCart';

export const BookDetailScreen = ({ route }: any) => {
  const { bookId, name, price } = route.params;
  const { addBook } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.bookTitle}>{name}</Text>
      <Text style={styles.price}>Mã sách: {bookId}</Text>
      <Text style={styles.price}>Giá: {price.toLocaleString('vi-VN')} đ</Text>

      <TouchableOpacity style={styles.addBtn} onPress={() => addBook({ bookId, name, price })}>
        <Text style={styles.addBtnText}>+ Thêm Vào Giỏ Hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 10, borderRadius: 8, elevation: 2 },
  bookTitle: { fontSize: 18, fontWeight: 'bold' },
  price: { color: '#007AFF', fontSize: 16, marginTop: 4 },
  addBtn: { backgroundColor: '#34C759', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});