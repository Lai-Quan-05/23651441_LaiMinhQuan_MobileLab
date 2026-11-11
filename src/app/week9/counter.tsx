import { Text, View } from 'react-native';
import { Button, Card, Intro, Page, s } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../weeks/week9/hooks';
import { decrement, increment, resetCounter } from '../../weeks/week9/store';
export default function ReduxCounter() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <Page>
      <Intro
        title="Một state, nhiều màn hình"
        subtitle="Counter lưu trong Redux, giữ giá trị khi chuyển tab."
      />
      <Card>
        <Text style={s.number}>{value}</Text>
        <View style={s.row}>
          <Button title="− Giảm" onPress={() => dispatch(decrement())} />
          <Button title="+ Tăng" onPress={() => dispatch(increment())} />
          <Button title="Đặt lại" secondary onPress={() => dispatch(resetCounter())} />
        </View>
      </Card>
      <Text style={s.muted}>
        useAppSelector đọc giá trị. useAppDispatch gửi action. Reducer trong counterSlice cập nhật
        state.
      </Text>
    </Page>
  );
}
