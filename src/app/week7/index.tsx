import { Stack, router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Intro, Page, s } from '../../components/ui';
import BikeArt from '../../weeks/week7/BikeArt';
export default function BikeWelcome() {
  return (
    <Page>
      <Stack.Screen options={{ title: 'Tuần 7 · Bike Shop' }} />
      <Intro title="Một hành trình mới" subtitle="Ba màn hình · Welcome → Catalog → Detail" />
      <BikeArt />
      <Card>
        <Text style={s.title}>Đi xa hơn.{'\n'}Khám phá nhiều hơn.</Text>
        <Text style={s.text}>Chọn chiếc xe phù hợp với nhịp sống và cung đường của bạn.</Text>
        <Button title="Khám phá bộ sưu tập" onPress={() => router.push('/week7/catalog')} />
      </Card>
      <Text style={s.muted}>
        Giá và sản phẩm là dữ liệu minh họa. Giỏ hàng dùng Context + useReducer, tồn tại trong phiên
        chạy ứng dụng.
      </Text>
    </Page>
  );
}
