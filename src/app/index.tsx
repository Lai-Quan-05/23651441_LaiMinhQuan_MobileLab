import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Page, colors, s } from '../components/ui';

const weeks = [
  {
    week: 1,
    title: 'Bắt đầu với React Native',
    topic: '8 bài • Components, props & hooks',
    path: '/week1',
  },
  { week: 2, title: 'Góc sách của bạn', topic: 'Components & bố cục nhà sách', path: '/week2' },
  {
    week: 3,
    title: 'Khám phá thư viện',
    topic: 'Giao diện nhà sách · CategoryChips & BookGrid',
    path: '/week3',
  },
  { week: 4, title: 'Chờ đề bài', topic: 'Chưa có nội dung bài tập' },
  {
    week: 5,
    title: 'Một chiếc điện thoại, bốn màu',
    topic: 'Điều hướng & truyền tham số',
    path: '/week5',
  },
  { week: 6, title: 'Hôm nay xem gì?', topic: 'Fetch API, FlatList & refresh', path: '/week6' },
  {
    week: 7,
    title: 'Đi xa hơn cùng xe đạp',
    topic: 'Ba màn hình Bike Shop',
    path: '/week7',
  },
  { week: 8, title: 'Một chuyến đi mới', topic: 'SectionList & cập nhật lạc quan', path: '/week8' },
  {
    week: 9,
    title: 'Quản lý state với Redux',
    topic: 'Counter, tài khoản & giỏ hàng sách',
    path: '/week9',
  },
  {
    week: 10,
    title: 'Bài viết & Async Thunk',
    topic: 'Thêm bài bằng POST & CRUD với createAsyncThunk',
    path: '/week10',
  },
] as const;

export default function Home() {
  const readyCount = weeks.filter((week) => 'path' in week).length;
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <Page>
        <View style={s.hero}>
          <Text style={{ color: '#91d8cf', fontSize: 12, letterSpacing: 2, fontWeight: '700' }}>
            THỰC HÀNH / MOBILE LAB
          </Text>
          <Text style={[s.title, { color: 'white', fontSize: 34 }]}>
            Học từng tuần.{'\n'}Làm từng bước.
          </Text>
          <Text style={{ color: '#d5e4e7', lineHeight: 23 }}>
            Lại Minh Quân · 23651441{'\n'}Lớp DHKTPM19ATT
          </Text>
          <View style={[s.row, { marginTop: 8 }]}>
            <Text style={{ color: 'white', fontWeight: '700' }}>
              {String(readyCount).padStart(2, '0')} tuần có bài
            </Text>
            <Text style={{ color: '#b5cdd3' }}>
              {' '}
              / {String(weeks.length - readyCount).padStart(2, '0')} tuần chờ đề
            </Text>
          </View>
        </View>
        <Text style={s.heading}>Chọn một bài thực hành</Text>
        {weeks.map((item) =>
          'path' in item ? (
            <Pressable
              key={item.week}
              accessibilityRole="button"
              accessibilityLabel={`Tuần ${item.week}: ${item.title}`}
              onPress={() => router.push(item.path)}
            >
              <Card>
                <View style={s.between}>
                  <Text style={{ fontSize: 13, color: colors.teal, fontWeight: '800' }}>
                    TUẦN {String(item.week).padStart(2, '0')}
                  </Text>
                  <Text style={{ color: colors.teal, fontSize: 22 }}>↗</Text>
                </View>
                <Text style={s.heading}>{item.title}</Text>
                <Text style={s.muted}>{item.topic}</Text>
              </Card>
            </Pressable>
          ) : (
            <View key={item.week} style={[s.card, { backgroundColor: '#eaf0f2' }]}>
              <Text style={s.muted}>
                TUẦN {String(item.week).padStart(2, '0')} · {item.title}
              </Text>
              <Text style={s.muted}>{item.topic}</Text>
            </View>
          ),
        )}
      </Page>
    </SafeAreaView>
  );
}
