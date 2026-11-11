import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { Button, Card, Intro, Page, s } from '../../components/ui';
import { bikes, money } from '../../data/catalog';
import BikeArt from '../../../week7/BikeArt';
import { useBikeCart } from '../../../week7/cart';
export default function BikeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bike = bikes.find((item) => item.id === id);
  const { items, dispatch } = useBikeCart();
  const [added, setAdded] = useState(false);
  if (!bike)
    return (
      <Page>
        <Text style={s.heading}>Không tìm thấy xe đạp.</Text>
        <Button title="Về danh mục" onPress={() => router.replace('/week7/catalog')} />
      </Page>
    );
  return (
    <Page>
      <Stack.Screen options={{ title: bike.name }} />
      <BikeArt color={bike.color} />
      <Intro title={bike.name} subtitle={bike.kind} />
      <Card>
        <Text style={s.title}>{money(bike.price)}</Text>
        <Text style={s.text}>{bike.description}</Text>
        <Button
          title="Thêm vào giỏ hàng"
          disabled={(items[bike.id] ?? 0) >= 99}
          onPress={() => {
            dispatch({ type: 'add', id: bike.id });
            setAdded(true);
          }}
        />
        {added && (
          <Text accessibilityLiveRegion="polite" style={s.muted}>
            Đã thêm xe vào giỏ hàng.
          </Text>
        )}
        <Button title="Xem giỏ hàng" secondary onPress={() => router.push('/week7/cart')} />
      </Card>
    </Page>
  );
}
