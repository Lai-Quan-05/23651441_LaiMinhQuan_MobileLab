import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Intro, Page, colors, s } from '../../components/ui';
import { findColor, phoneColors } from '../../../week5/phone';

export default function ChooseColor() {
  const params = useLocalSearchParams<{ selected?: string }>();
  const [selected, setSelected] = useState<string>(findColor(params.selected).id);
  return (
    <Page>
      <Stack.Screen options={{ title: 'Bảng màu' }} />
      <Intro
        title="Bạn thích màu nào?"
        subtitle="Chọn một màu rồi xác nhận để trở về chi tiết sản phẩm."
      />
      {phoneColors.map((color) => (
        <Pressable
          key={color.id}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === color.id }}
          accessibilityLabel={color.label}
          onPress={() => setSelected(color.id)}
          style={[
            s.card,
            s.between,
            selected === color.id && { borderColor: colors.teal, borderWidth: 2 },
          ]}
        >
          <View style={[s.row, { flexWrap: 'nowrap' }]}>
            <View style={{ width: 56, height: 56, backgroundColor: color.hex, borderRadius: 12 }} />
            <Text style={s.heading}>{color.label}</Text>
          </View>
          <Text style={s.text}>{selected === color.id ? '●' : '○'}</Text>
        </Pressable>
      ))}
      <Button
        title="Xác nhận màu"
        onPress={() => router.dismissTo({ pathname: '/week5', params: { color: selected } })}
      />
    </Page>
  );
}
