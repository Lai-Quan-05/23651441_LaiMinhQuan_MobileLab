import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Empty, Intro, Page, s } from '../../components/ui';
import { money } from '../../data/catalog';
import { useAppDispatch, useAppSelector } from '../../../week9/hooks';
import {
  changeQuantity,
  clearCart,
  removeBook,
  selectCart,
  selectCartCount,
  selectCartTotal,
} from '../../../week9/store';
export default function ReduxCart() {
  const lines = useAppSelector(selectCart);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  return (
    <Page>
      <Intro
        title="Giỏ hàng của bạn"
        subtitle={`${count} cuốn sách · Selectors tự tính số lượng và thành tiền`}
      />
      {!lines.length && <Empty text="Giỏ hàng chưa có sách. Chuyển sang tab Sách để thêm." />}
      {lines.map(({ book, quantity }) => (
        <Card key={book.id}>
          <Text style={s.heading}>{book.title}</Text>
          <Text style={s.muted}>Đơn giá: {money(book.price)}</Text>
          <View style={s.row}>
            <Button
              title={`Giảm ${book.title}`}
              secondary
              onPress={() => dispatch(changeQuantity({ bookId: book.id, quantity: quantity - 1 }))}
            />
            <Text style={s.heading}>{quantity}</Text>
            <Button
              title={`Tăng ${book.title}`}
              disabled={quantity >= 99}
              onPress={() => dispatch(changeQuantity({ bookId: book.id, quantity: quantity + 1 }))}
            />
          </View>
          <Text style={s.text}>Thành tiền: {money(book.price * quantity)}</Text>
          <Button title="Xóa khỏi giỏ" secondary onPress={() => dispatch(removeBook(book.id))} />
        </Card>
      ))}
      <Card>
        <Text style={s.heading}>Tổng cộng: {money(total)}</Text>
        <Button
          title="Tiếp tục đặt hàng"
          disabled={!lines.length}
          onPress={() => router.push('/checkout')}
        />
        <Button
          title="Xóa tất cả"
          secondary
          disabled={!lines.length}
          onPress={() => dispatch(clearCart())}
        />
      </Card>
      <Text style={s.muted}>
        Giới hạn 99 cuốn mỗi đầu sách. Giảm về 0 sẽ xóa dòng. State tồn tại trong phiên chạy ứng
        dụng.
      </Text>
    </Page>
  );
}
