import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, Intro, Page, colors, s } from '../../components/ui';
import { money } from '../../data/catalog';
import { findColor } from '../../../week5/phone';

export default function Phone() {
  const params = useLocalSearchParams<{ color?: string }>();
  const selected = findColor(params.color);
  return (
    <Page>
      <Stack.Screen options={{ title: 'Tuần 5 · Chọn màu điện thoại' }} />
      <Intro title="Màu sắc của riêng bạn" subtitle="Expo Router · Truyền và nhận tham số color" />
      <Card>
        <View
          style={{
            backgroundColor: '#eaf0f4',
            borderRadius: 14,
            padding: 28,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 240,
              width: 126,
              borderRadius: 23,
              borderWidth: 5,
              borderColor: '#203644',
              backgroundColor: selected.hex,
              padding: 12,
            }}
          >
            <View
              style={{
                width: 32,
                height: 55,
                borderRadius: 12,
                backgroundColor: '#162a39',
                padding: 4,
                gap: 4,
              }}
            >
              <View
                style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#8ca6b5' }}
              />
              <View
                style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#8ca6b5' }}
              />
            </View>
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 92, fontWeight: '800' }}>
              VSMART
            </Text>
          </View>
        </View>
        <Text style={s.heading}>Vsmart Joy 3 · 64 GB</Text>
        <Text style={s.muted}>★★★★☆ · Sản phẩm minh họa bài thực hành</Text>
        <Text style={[s.title, { color: colors.teal }]}>{money(1790000)}</Text>
        <Text style={s.text}>Màu đã chọn: {selected.label}</Text>
        <Button
          title="Chọn màu sản phẩm"
          onPress={() =>
            router.push({ pathname: '/week5/colors', params: { selected: selected.id } })
          }
        />
      </Card>
      <Text style={s.muted}>
        Màu được truyền qua URL. Có thể mở trực tiếp /week5?color=red để kiểm tra.
      </Text>
    </Page>
  );
}
