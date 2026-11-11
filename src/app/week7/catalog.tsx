import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Chip, Intro, Page, s } from '../../components/ui';
import { bikes, money } from '../../data/catalog';
import BikeArt from '../../../week7/BikeArt';
import { useBikeCart } from '../../../week7/cart';
export default function BikeCatalog() {
  const [kind, setKind] = useState('Tất cả');
  const { items } = useBikeCart();
  const count = Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
  return (
    <Page>
      <Stack.Screen options={{ title: 'Bộ sưu tập xe đạp' }} />
      <Intro title="Tìm chiếc xe của bạn" subtitle="Lọc danh mục theo loại xe" />
      <Button title={`Giỏ hàng (${count})`} secondary onPress={() => router.push('/week7/cart')} />
      <View style={s.row}>
        {['Tất cả', 'Road', 'Mountain'].map((value) => (
          <Chip key={value} title={value} active={kind === value} onPress={() => setKind(value)} />
        ))}
      </View>
      {bikes
        .filter((bike) => kind === 'Tất cả' || bike.kind === kind)
        .map((bike) => (
          <Card key={bike.id}>
            <BikeArt color={bike.color} />
            <Text style={s.heading}>{bike.name}</Text>
            <Text style={s.muted}>
              {bike.kind} · {money(bike.price)}
            </Text>
            <Button
              title={`Xem ${bike.name}`}
              onPress={() => router.push({ pathname: '/week7/[id]', params: { id: bike.id } })}
            />
          </Card>
        ))}
    </Page>
  );
}
