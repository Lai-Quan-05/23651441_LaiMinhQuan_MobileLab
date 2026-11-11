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
import { Button, Card, Empty, Intro, Page, colors, s } from '../src/components/ui';
import { errorMessage, getMovies, movieEndpoint, type Movie } from '../src/data/api';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [grid, setGrid] = useState(false);
  const [selected, setSelected] = useState<Movie>();
  const lifecycle = useRef({
    mounted: false,
    busy: false,
    controller: null as AbortController | null,
  });
  const read = useCallback(async (controller: AbortController) => {
    const life = lifecycle.current;
    try {
      const data = await getMovies(controller.signal);
      if (life.mounted && life.controller === controller) setMovies(data);
    } catch (cause) {
      if (life.mounted && life.controller === controller) setError(errorMessage(cause));
    } finally {
      if (life.mounted && life.controller === controller) {
        setLoading(false);
        setRefreshing(false);
        life.busy = false;
      }
    }
  }, []);
  const load = useCallback(
    (refresh = false) => {
      const life = lifecycle.current;
      if (!life.mounted || life.busy) return;
      life.busy = true;
      life.controller = new AbortController();
      setError('');
      setRefreshing(refresh);
      setLoading(!refresh);
      void read(life.controller);
    },
    [read],
  );
  useEffect(() => {
    const life = lifecycle.current;
    life.mounted = true;
    life.busy = true;
    life.controller = new AbortController();
    void read(life.controller);
    return () => {
      life.mounted = false;
      life.busy = false;
      life.controller?.abort();
    };
  }, [read]);
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
            enabled={!loading && !refreshing}
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
