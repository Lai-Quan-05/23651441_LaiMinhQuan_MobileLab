import { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Card, Chip, Empty, Input, Intro, Page, colors, s } from '../ui';
import { books, money, type Book } from '../../data/catalog';

export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <View
      accessibilityLabel={`Bìa sách ${book.title}`}
      style={{
        width: large ? '100%' : 78,
        height: large ? 170 : 108,
        backgroundColor: book.color,
        borderRadius: 8,
        padding: 12,
        justifyContent: 'space-between',
        borderLeftWidth: 6,
        borderLeftColor: '#ffffff35',
      }}
    >
      <Text style={{ color: '#ffffffa8', fontSize: 10, letterSpacing: 1 }}>MOBILE LAB</Text>
      <Text
        numberOfLines={4}
        style={{ color: 'white', fontSize: large ? 22 : 12, fontWeight: '700' }}
      >
        {book.title}
      </Text>
      <Text style={{ color: '#ffffffaa', fontSize: 10 }}>THƯ VIỆN / 2026</Text>
    </View>
  );
}
export function BookCard({ book, grid = false }: { book: Book; grid?: boolean }) {
  return (
    <View style={[s.card, { flex: 1 }, !grid && { flexDirection: 'row' }]}>
      <BookCover book={book} large={grid} />
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={s.heading}>{book.title}</Text>
        <Text style={s.muted}>{book.author}</Text>
        <Text style={s.muted}>{book.category}</Text>
        <Text style={[s.text, { color: colors.teal, fontWeight: '800' }]}>{money(book.price)}</Text>
      </View>
    </View>
  );
}
export default function Bookstore({ interactive }: { interactive: boolean }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [grid, setGrid] = useState(true);
  const filtered = useMemo(
    () =>
      books.filter(
        (book) =>
          (category === 'Tất cả' || book.category === category) &&
          `${book.title} ${book.author}`
            .toLocaleLowerCase('vi')
            .includes(query.trim().toLocaleLowerCase('vi')),
      ),
    [category, query],
  );
  const header = (
    <View style={{ gap: 16, paddingBottom: 16 }}>
      <Intro
        title={interactive ? 'Khám phá thư viện' : 'Góc sách của bạn'}
        subtitle={`Tuần ${interactive ? '3 · Tìm kiếm và danh mục' : '2 · Components và Flexbox'}`}
      />
      <View style={[s.hero, { backgroundColor: '#e2eee7' }]}>
        <Text style={{ color: colors.teal, fontWeight: '700' }}>MỖI TRANG SÁCH, MỘT KHỞI ĐẦU</Text>
        <Text style={s.title}>Dành một chút{'\n'}thời gian để đọc.</Text>
        <Text style={s.muted}>6 đầu sách minh họa · Giá và tác giả hư cấu</Text>
      </View>
      {interactive ? (
        <>
          <Input
            accessibilityLabel="Tìm sách"
            placeholder="Tên sách hoặc tác giả…"
            value={query}
            onChangeText={setQuery}
          />
          <View style={s.row}>
            {['Tất cả', 'Văn học', 'Công nghệ', 'Kỹ năng'].map((value) => (
              <Chip
                key={value}
                title={value}
                active={value === category}
                onPress={() => setCategory(value)}
              />
            ))}
          </View>
          <View style={s.between}>
            <Text style={s.muted}>{filtered.length} cuốn sách</Text>
            <Button
              title={grid ? 'Xem danh sách' : 'Xem dạng lưới'}
              secondary
              onPress={() => setGrid((value) => !value)}
            />
          </View>
        </>
      ) : (
        <Card>
          <Text style={s.heading}>Sách nổi bật</Text>
          <Text style={s.muted}>
            Header, BookCover và BookCard là các component nhận props và tái sử dụng.
          </Text>
        </Card>
      )}
    </View>
  );
  return (
    <Page scroll={false}>
      <FlatList
        key={interactive && grid ? 'grid' : 'list'}
        data={interactive ? filtered : books}
        numColumns={interactive && grid ? 2 : 1}
        keyExtractor={(book) => book.id}
        ListHeaderComponent={header}
        ListEmptyComponent={<Empty text="Không tìm thấy sách phù hợp. Thử từ khóa khác nhé." />}
        contentContainerStyle={s.content}
        columnWrapperStyle={interactive && grid ? { gap: 12 } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <BookCard book={item} grid={interactive && grid} />}
      />
    </Page>
  );
}
