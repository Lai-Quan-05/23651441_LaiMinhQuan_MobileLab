import { Stack, router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Empty, Intro, Page, s } from '../../components/ui';
import { bikes, money } from '../../data/catalog';
import { useBikeCart } from '../../../week7/cart';
export default function BikeBasket() {
  const { items, dispatch } = useBikeCart();
  const selected = bikes.filter((bike) => (items[bike.id] ?? 0) > 0);
  const total = selected.reduce((sum, bike) => sum + bike.price * (items[bike.id] ?? 0), 0);
  return (
    <Page>
      <Stack.Screen options={{ title: 'Giỏ hàng xe đạp' }} />
      <Intro title="Sẵn sàng lên đường" subtitle="Giỏ hàng trong phiên chạy hiện tại" />
      {!selected.length && (
        <Empty text="Giỏ hàng trống. Khám phá bộ sưu tập và chọn một chiếc xe." />
      )}
      {selected.map((bike) => (
        <Card key={bike.id}>
          <Text style={s.heading}>{bike.name}</Text>
          <Text style={s.text}>{money(bike.price)}</Text>
          <View style={s.row}>
            <Button
              title={`Giảm ${bike.name}`}
              secondary
              onPress={() =>
                dispatch({ type: 'change', id: bike.id, quantity: (items[bike.id] ?? 0) - 1 })
              }
            />
            <Text style={s.heading}>{items[bike.id]}</Text>
            <Button
              title={`Tăng ${bike.name}`}
              disabled={(items[bike.id] ?? 0) >= 99}
              onPress={() => dispatch({ type: 'add', id: bike.id })}
            />
          </View>
          <Button
            title="Xóa sản phẩm"
            secondary
            onPress={() => dispatch({ type: 'change', id: bike.id, quantity: 0 })}
          />
        </Card>
      ))}
      <Card>
        <Text style={s.heading}>Tổng cộng: {money(total)}</Text>
        <Button title="Tiếp tục chọn xe" onPress={() => router.dismissTo('/week7/catalog')} />
        <Button
          title="Xóa giỏ hàng"
          secondary
          disabled={!selected.length}
          onPress={() => dispatch({ type: 'clear' })}
        />
      </Card>
    </Page>
  );
}
