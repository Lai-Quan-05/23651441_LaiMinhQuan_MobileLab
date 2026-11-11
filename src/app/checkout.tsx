import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Empty, Input, Intro, Page, s } from '../components/ui';
import { money } from '../data/catalog';
import { useAppDispatch, useAppSelector } from '../weeks/week9/hooks';
import { clearCart, selectCartCount, selectCartTotal } from '../weeks/week9/store';

export default function Checkout() {
  const total = useAppSelector(selectCartTotal);
  const count = useAppSelector(selectCartCount);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState<{ count: number; total: number }>();
  const submit = () => {
    if (
      name.trim().length < 2 ||
      !/^(0\d{9}|\+84\d{9})$/.test(phone.trim()) ||
      address.trim().length < 10
    ) {
      setError('Nhập tên, số điện thoại Việt Nam hợp lệ và địa chỉ ít nhất 10 ký tự.');
      return;
    }
    if (!count) return;
    setOrder({ count, total });
    dispatch(clearCart());
  };
  return (
    <Page>
      <Stack.Screen options={{ title: 'Tuần 9 · Đặt hàng mô phỏng' }} />
      {order ? (
        <Card>
          <Text style={s.title}>Đặt hàng mô phỏng thành công</Text>
          <Text style={s.text}>
            {order.count} cuốn sách · {money(order.total)}
          </Text>
          <Text style={s.muted}>
            Giỏ hàng đã được xóa. Không có giao dịch tiền hoặc đơn hàng gửi đến máy chủ.
          </Text>
          <Button title="Trở về nhà sách" onPress={() => router.dismissTo('/week9')} />
        </Card>
      ) : count ? (
        <>
          <Intro
            title="Thông tin nhận sách"
            subtitle="Bài thực hành biểu mẫu · Không phát sinh giao dịch"
          />
          <Card>
            <Input
              accessibilityLabel="Họ tên người nhận"
              placeholder="Họ tên người nhận (mẫu)"
              value={name}
              onChangeText={setName}
              maxLength={80}
            />
            <Input
              accessibilityLabel="Số điện thoại người nhận"
              placeholder="0901234567"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={12}
            />
            <Input
              accessibilityLabel="Địa chỉ nhận sách"
              placeholder="Địa chỉ mẫu, ít nhất 10 ký tự"
              value={address}
              onChangeText={setAddress}
              multiline
              maxLength={250}
            />
            <Text style={s.heading}>
              {count} cuốn · {money(total)}
            </Text>
            {error ? <Text style={s.error}>{error}</Text> : null}
            <Button title="Xác nhận đơn mô phỏng" onPress={submit} />
          </Card>
        </>
      ) : (
        <>
          <Empty text="Giỏ hàng trống. Thêm sách trước khi đặt hàng." />
          <Button title="Về nhà sách" onPress={() => router.dismissTo('/week9')} />
        </>
      )}
    </Page>
  );
}
