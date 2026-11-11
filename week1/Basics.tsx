import { useEffect, useState, type PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, Switch, Text, View } from 'react-native';
import { Button, Card, Chip, Input, Intro, Page, s } from '../src/components/ui';

export function UserCard({ name, age, isAdmin }: { name: string; age: number; isAdmin: boolean }) {
  return (
    <Card>
      <Text style={s.heading}>{name}</Text>
      <Text style={s.text}>
        {age} tuổi · {isAdmin ? 'Quản trị viên' : 'Thành viên'}
      </Text>
      {isAdmin && <Text style={s.muted}>Có quyền quản lý nội dung</Text>}
    </Card>
  );
}
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <Text style={s.number}>{count}</Text>
      <View style={s.row}>
        <Button title="− Giảm" onPress={() => setCount((n) => n - 1)} />
        <Button title="+ Tăng" onPress={() => setCount((n) => n + 1)} />
        <Button title="Đặt lại" secondary onPress={() => setCount(0)} />
      </View>
    </Card>
  );
}
function TodoList() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ id: number; title: string; done: boolean }[]>([]);
  const [nextId, setNextId] = useState(1);
  const add = () => {
    if (!text.trim()) return;
    setTodos((items) => [...items, { id: nextId, title: text.trim(), done: false }]);
    setNextId((id) => id + 1);
    setText('');
  };
  return (
    <Card>
      <Input
        accessibilityLabel="Công việc mới"
        placeholder="Một việc bạn muốn làm…"
        value={text}
        onChangeText={setText}
        onSubmitEditing={add}
        maxLength={150}
      />
      <Button title="Thêm công việc" disabled={!text.trim()} onPress={add} />
      {!todos.length && (
        <Text style={s.muted}>Chưa có công việc. Thêm một việc nhỏ để bắt đầu.</Text>
      )}
      {todos.map((todo) => (
        <View key={todo.id} style={s.between}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: todo.done }}
            accessibilityLabel={todo.title}
            style={{ flex: 1, paddingVertical: 10 }}
            onPress={() =>
              setTodos((items) =>
                items.map((item) => (item.id === todo.id ? { ...item, done: !item.done } : item)),
              )
            }
          >
            <Text style={[s.text, todo.done && { textDecorationLine: 'line-through' }]}>
              {todo.done ? '☑' : '□'} {todo.title}
            </Text>
          </Pressable>
          <Button
            title="Xóa"
            secondary
            onPress={() => setTodos((items) => items.filter((item) => item.id !== todo.id))}
          />
        </View>
      ))}
      <Text style={s.muted}>
        {todos.filter((item) => item.done).length}/{todos.length} việc đã hoàn thành
      </Text>
    </Card>
  );
}
function CustomButtonDemo() {
  const [message, setMessage] = useState('Chọn một nút để xem kết quả.');
  return (
    <Card>
      <Button title="Nút chính" onPress={() => setMessage('Bạn vừa nhấn nút chính.')} />
      <Button title="Nút phụ" secondary onPress={() => setMessage('Bạn vừa nhấn nút phụ.')} />
      <Button title="Nút bị vô hiệu hóa" disabled onPress={() => setMessage('Không thể nhấn')} />
      <Text accessibilityLiveRegion="polite" style={s.text}>
        {message}
      </Text>
    </Card>
  );
}
function LiveInput() {
  const [name, setName] = useState('');
  return (
    <Card>
      <Input
        accessibilityLabel="Tên của bạn"
        placeholder="Nhập tên của bạn"
        value={name}
        onChangeText={setName}
        maxLength={80}
      />
      <Text style={s.heading}>
        {name.trim() ? `Xin chào, ${name.trim()}!` : 'Mình nên gọi bạn là gì?'}
      </Text>
      <Text style={s.muted}>{name.length}/80 ký tự</Text>
    </Card>
  );
}
export function LoadingWrapper({ loading, children }: PropsWithChildren<{ loading: boolean }>) {
  return loading ? (
    <ActivityIndicator accessibilityLabel="Đang tải" size="large" />
  ) : (
    <>{children}</>
  );
}
function LoadingDemo() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <Card>
      <LoadingWrapper loading={loading}>
        <Text style={s.text}>Đã tải xong nội dung. Wrapper có thể bọc bất kỳ component nào.</Text>
      </LoadingWrapper>
      <Button title="Tải lại" disabled={loading} onPress={() => setLoading(true)} />
    </Card>
  );
}
function GenderSelector() {
  const [gender, setGender] = useState<string>();
  return (
    <Card>
      <Text style={s.text}>Bạn chọn giới tính nào?</Text>
      <View style={s.row}>
        {['Nam', 'Nữ', 'Khác', 'Không chia sẻ'].map((value) => (
          <Chip
            key={value}
            title={value}
            active={value === gender}
            onPress={() => setGender(value)}
          />
        ))}
      </View>
      <Text style={s.muted}>Đã chọn: {gender ?? 'Chưa chọn'}</Text>
    </Card>
  );
}
function AppButtonDemo() {
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => {
      setBusy(false);
      setSaved(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [busy]);
  return (
    <Card>
      <View style={s.between}>
        <Text style={s.text}>Vô hiệu hóa nút</Text>
        <Switch
          accessibilityLabel="Vô hiệu hóa nút lưu"
          value={disabled}
          onValueChange={setDisabled}
        />
      </View>
      <Button
        title="Lưu thay đổi"
        disabled={disabled}
        busy={busy}
        onPress={() => {
          setSaved(false);
          setBusy(true);
        }}
      />
      <Text style={s.muted}>
        {saved ? 'Đã lưu mô phỏng thành công.' : 'AppButton có trạng thái loading và disabled.'}
      </Text>
    </Card>
  );
}
const lessons = [
  {
    title: 'User Card',
    concept: 'Props và hiển thị có điều kiện',
    Component: () => (
      <>
        <UserCard name="Lại Minh Quân" age={21} isAdmin />
        <UserCard name="Bạn học" age={20} isAdmin={false} />
      </>
    ),
  },
  { title: 'Counter', concept: 'useState và cập nhật dựa trên state trước', Component: Counter },
  { title: 'Todo List', concept: 'Mảng bất biến, thêm, xóa và đánh dấu', Component: TodoList },
  {
    title: 'Custom Button',
    concept: 'Component tái sử dụng và callback',
    Component: CustomButtonDemo,
  },
  { title: 'Live Input', concept: 'Controlled TextInput', Component: LiveInput },
  { title: 'Loading Wrapper', concept: 'children, useEffect và cleanup', Component: LoadingDemo },
  { title: 'Gender Selector', concept: 'Lựa chọn duy nhất và state', Component: GenderSelector },
  {
    title: 'App Button',
    concept: 'Loading, disabled và phản hồi thao tác',
    Component: AppButtonDemo,
  },
];
export default function Basics() {
  const [selected, setSelected] = useState(0);
  const lesson = lessons[selected] ?? lessons[0]!;
  return (
    <Page>
      <Intro title="Tám bước khởi đầu" subtitle="Tuần 1 · React Native core components & hooks" />
      <View style={s.row}>
        {lessons.map((item, i) => (
          <Chip
            key={item.title}
            title={`Bài ${i + 1}`}
            active={i === selected}
            onPress={() => setSelected(i)}
          />
        ))}
      </View>
      <Text style={s.heading}>{lesson.title}</Text>
      <Text style={s.muted}>{lesson.concept}</Text>
      <lesson.Component key={selected} />
    </Page>
  );
}
