import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Input, Intro, Page, s } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../../week9/hooks';
import { signIn, signOut } from '../../../week9/store';
export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const login = () => {
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Nhập tên ít nhất 2 ký tự và email hợp lệ.');
      return;
    }
    setError('');
    dispatch(signIn({ name: name.trim(), email: email.trim() }));
  };
  return (
    <Page>
      <Intro
        title="Tài khoản thực hành"
        subtitle="Auth slice minh họa trạng thái đăng nhập trên máy."
      />
      <Text style={s.muted}>
        Đây là đăng nhập mô phỏng, không có máy chủ xác thực. Dùng tên và email giả để thực hành.
      </Text>
      {user ? (
        <Card>
          <Text style={s.heading}>Xin chào, {user.name}</Text>
          <Text style={s.text}>{user.email}</Text>
          <Button title="Đăng xuất" secondary onPress={() => dispatch(signOut())} />
        </Card>
      ) : (
        <Card>
          <Input
            accessibilityLabel="Tên hiển thị"
            placeholder="Tên hiển thị"
            value={name}
            onChangeText={setName}
            maxLength={80}
          />
          <Input
            accessibilityLabel="Email mô phỏng"
            placeholder="ban@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={100}
          />
          {error ? <Text style={s.error}>{error}</Text> : null}
          <Button title="Đăng nhập mô phỏng" onPress={login} />
        </Card>
      )}
    </Page>
  );
}
