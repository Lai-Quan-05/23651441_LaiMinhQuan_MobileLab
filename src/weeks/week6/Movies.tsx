import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  Switch,
  Text,
  View,
} from 'react-native';
import { Button, Card, Empty, Intro, Page, colors, s } from '../../components/ui';
import { errorMessage, getMovies, movieEndpoint, type Movie } from '../../data/api';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [grid, setGrid] = useState(false);
  const [selected, setSelected] = useState<Movie>();
  const sequence = useRef(0);
  const load = useCallback(async (refresh = false) => {
    const id = ++sequence.current;
    setError('');
    setRefreshing(refresh);
    setLoading(!refresh);
    try {
      const data = await getMovies();
      if (id === sequence.current) setMovies(data);
    } catch (cause) {
      if (id === sequence.current) setError(errorMessage(cause));
    } finally {
      if (id === sequence.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);
  useEffect(() => {
    let active = true;
    void getMovies()
      .then((data) => {
        if (active) setMovies(data);
      })
      .catch((cause) => {
        if (active) setError(errorMessage(cause));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <Page scroll={false}>
      <FlatList
        key={grid ? 'grid' : 'list'}
        data={movies}
        keyExtractor={(movie) => movie.id}
        numColumns={grid ? 2 : 1}
        contentContainerStyle={s.content}
        columnWrapperStyle={grid ? { gap: 12 } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            enabled={!loading}
            onRefresh={() => {
              if (!loading) void load(true);
            }}
            tintColor={colors.teal}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: 14, paddingBottom: 16 }}>
            <Intro
              title="Hôm nay xem gì?"
              subtitle="Tuần 6 · Fetch API, FlatList & pull-to-refresh"
            />
            <Text style={s.muted}>
              {movieEndpoint
                ? 'Nguồn: API riêng đã cấu hình'
                : 'Nguồn: dữ liệu mẫu, phim và điểm số hư cấu'}
            </Text>
            <View style={s.between}>
              <Text style={s.text}>Hiển thị lưới hai cột</Text>
              <Switch
                accessibilityLabel="Hiển thị phim dạng lưới"
                value={grid}
                onValueChange={setGrid}
              />
            </View>
            <Button
              title="Tải lại danh sách"
              disabled={loading || refreshing}
              onPress={() => void load(true)}
            />
            {error ? (
              <Card>
                <Text accessibilityRole="alert" style={s.error}>
                  {error}
                </Text>
                <Button title="Thử lại" onPress={() => void load(movies.length > 0)} />
              </Card>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={colors.teal} />
          ) : (
            <Empty
              text={
                error
                  ? 'Chưa tải được phim. Kiểm tra kết nối hoặc cấu hình API.'
                  : 'Danh sách phim đang trống.'
              }
            />
          )
        }
        renderItem={({ item, index }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Xem phim ${item.title}`}
            onPress={() => setSelected(item)}
            style={{ flex: 1 }}
          >
            <Card>
              <View
                style={{
                  height: grid ? 130 : 100,
                  backgroundColor: ['#1f5562', '#6c527a', '#8b653a'][index % 3],
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  padding: 16,
                }}
              >
                <Text style={{ color: '#ffffffaa', fontSize: 11, letterSpacing: 2 }}>
                  CINEMA / {item.year}
                </Text>
                <Text style={{ color: 'white', fontSize: 22 }}>▶</Text>
              </View>
              <Text style={s.heading}>{item.title}</Text>
              <Text style={s.muted}>
                {item.genre} · {item.year}
              </Text>
              <Text style={{ color: colors.teal, fontWeight: '700' }}>
                ★ {item.rating.toFixed(1)} / 10
              </Text>
            </Card>
          </Pressable>
        )}
      />
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(undefined)}
      >
        <View
          style={{ flex: 1, backgroundColor: '#142f3daa', justifyContent: 'center', padding: 24 }}
        >
          <Card>
            <Text style={s.title}>{selected?.title}</Text>
            <Text style={s.text}>
              {selected?.genre} · {selected?.year}
            </Text>
            <Text style={s.text}>Điểm đánh giá: {selected?.rating}/10</Text>
            <Button title="Đóng chi tiết" onPress={() => setSelected(undefined)} />
          </Card>
        </View>
      </Modal>
    </Page>
  );
}
