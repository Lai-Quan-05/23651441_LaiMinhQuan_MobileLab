import assert from 'node:assert/strict';
import test from 'node:test';
import { books } from '../src/data/catalog';
import { bikeCartReducer } from '../src/weeks/week7/cartReducer';
import {
  addBook,
  changeQuantity,
  clearCart,
  createLabStore,
  increment,
  removeBook,
  selectCartCount,
  selectCartTotal,
  signIn,
  signOut,
} from '../src/weeks/week9/store';

test('thêm cùng sách tăng số lượng, không tạo dòng trùng; tổng tiền dùng giá catalogue', () => {
  const store = createLabStore();
  store.dispatch(addBook('b1'));
  store.dispatch(addBook('b1'));
  store.dispatch(addBook('b2'));
  assert.equal(store.getState().cart.lines.length, 2);
  assert.equal(selectCartCount(store.getState()), 3);
  assert.equal(selectCartTotal(store.getState()), books[0]!.price * 2 + books[1]!.price);
});
test('giới hạn số lượng, bỏ qua NaN, giảm về 0 xóa sản phẩm', () => {
  const store = createLabStore();
  store.dispatch(addBook('b1'));
  store.dispatch(changeQuantity({ bookId: 'b1', quantity: 1000 }));
  assert.equal(selectCartCount(store.getState()), 99);
  store.dispatch(changeQuantity({ bookId: 'b1', quantity: NaN }));
  assert.equal(selectCartCount(store.getState()), 99);
  store.dispatch(changeQuantity({ bookId: 'b1', quantity: 0 }));
  assert.equal(selectCartTotal(store.getState()), 0);
});
test('sản phẩm không tồn tại không được đưa vào giỏ; xóa và clear cập nhật selectors', () => {
  const store = createLabStore();
  store.dispatch(addBook('khong-ton-tai'));
  assert.equal(selectCartCount(store.getState()), 0);
  store.dispatch(addBook('b1'));
  store.dispatch(addBook('b2'));
  store.dispatch(removeBook('b1'));
  assert.equal(selectCartTotal(store.getState()), books[1]!.price);
  store.dispatch(clearCart());
  assert.equal(selectCartCount(store.getState()), 0);
});
test('counter và auth độc lập với giỏ hàng', () => {
  const store = createLabStore();
  store.dispatch(addBook('b1'));
  store.dispatch(increment());
  store.dispatch(signIn({ name: 'Demo', email: 'demo@example.com' }));
  store.dispatch(signOut());
  assert.equal(store.getState().auth.user, null);
  assert.equal(store.getState().counter.value, 1);
  assert.equal(selectCartCount(store.getState()), 1);
});
test('giỏ xe không sửa state đầu vào, cộng dồn và xóa khi giảm về 0', () => {
  const initial = { r1: 1 };
  const added = bikeCartReducer(initial, { type: 'add', id: 'r1' });
  assert.deepEqual(initial, { r1: 1 });
  assert.deepEqual(added, { r1: 2 });
  assert.deepEqual(bikeCartReducer(added, { type: 'change', id: 'r1', quantity: -1 }), {});
  assert.deepEqual(bikeCartReducer(added, { type: 'change', id: 'r1', quantity: Infinity }), added);
});
