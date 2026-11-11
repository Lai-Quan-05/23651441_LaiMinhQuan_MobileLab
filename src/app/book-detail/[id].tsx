import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { Button, Card, Intro, Page, s } from '../../components/ui';
import { books, money } from '../../data/catalog';
import { BookCover } from '../../weeks/bookstore/Bookstore';
import { useAppDispatch } from '../../weeks/week9/hooks';
import { addBook } from '../../weeks/week9/store';
export default function BookDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = books.find((item) => item.id === id);
  const dispatch = useAppDispatch();
  if (!book)
    return (
      <Page>
        <Text style={s.heading}>Không tìm thấy sách.</Text>
        <Button title="Về nhà sách" onPress={() => router.replace('/week9')} />
      </Page>
    );
  return (
    <Page>
      <Stack.Screen options={{ title: 'Tuần 9 · Chi tiết sách' }} />
      <BookCover book={book} large />
      <Intro title={book.title} subtitle={`${book.author} · ${book.category}`} />
      <Card>
        <Text style={s.title}>{money(book.price)}</Text>
        <Text style={s.text}>
          Đầu sách hư cấu dùng để thực hành đọc tham số id và chia sẻ giỏ hàng giữa các màn hình
          bằng Redux Toolkit.
        </Text>
        <Button
          title="Thêm vào giỏ và xem giỏ"
          onPress={() => {
            dispatch(addBook(book.id));
            router.navigate('/week9/cart');
          }}
        />
      </Card>
    </Page>
  );
}
