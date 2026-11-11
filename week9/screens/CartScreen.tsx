import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../store/cartSlice';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Laptop Dell XPS', price: 1200 },
  { id: 2, name: 'Chuột Logitech', price: 45 },
  { id: 3, name: 'Bàn phím Cơ', price: 120 },
];

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddRandom = () => {
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🛒 Feature: Shopping Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng đang trống!</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
              <Text style={{ color: 'red', marginLeft: 10 }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddRandom}>
          <Text style={styles.btnText}>+ Thêm Sản Phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
          <Text style={styles.btnText}>🗑️ Xóa Giỏ</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalText}>Tổng tiền: ${totalPrice.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  emptyText: { color: '#888', fontStyle: 'italic', marginBottom: 12 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  itemName: { fontSize: 14, fontWeight: 'bold' },
  itemPrice: { color: '#666', fontSize: 12 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  qtyBtn: { backgroundColor: '#ddd', width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontWeight: 'bold' },
  qtyNum: { marginHorizontal: 8, fontWeight: 'bold' },
  actionRow: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' },
  addBtn: { backgroundColor: '#34C759', padding: 10, borderRadius: 6, flex: 1, marginRight: 6, alignItems: 'center' },
  clearBtn: { backgroundColor: '#FF3B30', padding: 10, borderRadius: 6, marginLeft: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#34C759', marginTop: 12, textAlign: 'right' },
});