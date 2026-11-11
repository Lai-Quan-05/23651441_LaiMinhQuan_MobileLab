// BookCartScreen.tsx
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../hooks/useCart';

export const BookCartScreen = ({ navigation }: any) => {
  const { cartItems, totalPrice, changeQuantity, removeBook } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.bookId}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
              <Text style={{ color: '#666' }}>{item.price.toLocaleString('vi-VN')} đ</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => changeQuantity(item.bookId, item.quantity - 1)}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => changeQuantity(item.bookId, item.quantity + 1)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeBook(item.bookId)}>
              <Text style={{ color: 'red', marginLeft: 12 }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tổng tiền: {totalPrice.toLocaleString('vi-VN')} đ</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout', { totalPrice })}>
          <Text style={styles.checkoutText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// CheckoutScreen.tsx
export const CheckoutScreen = ({ route }: any) => {
  const { totalPrice } = route.params || { totalPrice: 0 };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>XÁC NHẬN THANH TOÁN</Text>
      <Text style={{ fontSize: 18, color: '#34C759', marginTop: 10 }}>
        Tổng tiền nhận: {totalPrice.toLocaleString('vi-VN')} đ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  item: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, marginBottom: 8, borderRadius: 8, alignItems: 'center' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  qtyBtn: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 8, backgroundColor: '#eee', borderRadius: 4 },
  qtyText: { marginHorizontal: 8, fontWeight: 'bold' },
  footer: { borderTopWidth: 1, borderColor: '#ccc', paddingTop: 12 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});