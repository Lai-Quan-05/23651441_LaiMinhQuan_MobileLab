import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Input, Intro, Page, s } from '../../components/ui';
import { books, money } from '../../data/catalog';
import { BookCover } from '../../weeks/bookstore/Bookstore';
import { useAppDispatch, useAppSelector } from '../../weeks/week9/hooks';
import { addBook, selectCartCount } from '../../weeks/week9/store';
export default function ReduxBooks() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartCount);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const filtered = books.filter((book) =>
    book.title.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')),
  );
  return (
    <Page>
      <Intro
        title="Thư viện & giỏ hàng"
        subtitle="Redux Toolkit · Store → Slice → Action → Selector"
      />
      <Input
        accessibilityLabel="Tìm sách Redux"
        placeholder="Tìm tên sách…"
        value={query}
        onChangeText={setQuery}
      />
      <Button
        title={`Xem giỏ hàng (${count})`}
        secondary
        onPress={() => router.navigate('/week9/cart')}
      />
      {message ? (
        <Text accessibilityLiveRegion="polite" style={s.muted}>
          {message}
        </Text>
      ) : null}
      {!filtered.length && <Text style={s.muted}>Không tìm thấy sách phù hợp.</Text>}
      {filtered.map((book) => (
        <Card key={book.id}>
          <View style={[s.row, { flexWrap: 'nowrap' }]}>
            <BookCover book={book} />
            <View style={{ flex: 1, gap: 8 }}>
              <Text style={s.heading}>{book.title}</Text>
              <Text style={s.muted}>{book.author}</Text>
              <Text style={s.text}>{money(book.price)}</Text>
            </View>
          </View>
          <Button
            title={`Chi tiết ${book.title}`}
            secondary
            onPress={() => router.push({ pathname: '/book-detail/[id]', params: { id: book.id } })}
          />
          <Button
            title={`Thêm ${book.title}`}
            onPress={() => {
              dispatch(addBook(book.id));
              setMessage(`Đã thêm “${book.title}” vào giỏ.`);
            }}
          />
        </Card>
      ))}
    </Page>
  );
}
