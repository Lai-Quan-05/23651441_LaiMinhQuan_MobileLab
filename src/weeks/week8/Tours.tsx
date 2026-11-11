import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  SectionList,
  Switch,
  Text,
  View,
} from 'react-native';
import { Button, Card, Empty, Input, Intro, Page, colors, s } from '../../components/ui';
import {
  errorMessage,
  getTours,
  groupTours,
  saveFavorite,
  tourEndpoint,
  type Tour,
} from '../../data/api';
import { money } from '../../data/catalog';

function TourCard({
  tour,
  compact = false,
  pending,
  locked,
  onToggle,
  onOpen,
}: {
  tour: Tour;
  compact?: boolean;
  pending: boolean;
  locked: boolean;
  onToggle: (tour: Tour) => void;
  onOpen: (tour: Tour) => void;
}) {
  return (
    <View style={compact ? { width: 265 } : undefined}>
      <Card>
        <Text style={{ color: colors.teal, fontSize: 12, letterSpacing: 1, fontWeight: '700' }}>
          {tour.city.toLocaleUpperCase('vi')}
        </Text>
        <Text style={s.heading}>{tour.name}</Text>
        <Text style={s.muted}>
          {tour.days} ngày ·{' '}
          {new Intl.DateTimeFormat('vi-VN', { timeZone: 'UTC' }).format(new Date(tour.departure))}
        </Text>
        <Text style={s.text}>{money(tour.price)}</Text>
        <Button
          title={tour.isFavorite ? '♥ Bỏ yêu thích' : '♡ Yêu thích'}
          busy={pending}
          disabled={locked}
          secondary={tour.isFavorite}
          onPress={() => onToggle(tour)}
        />
        {!compact && <Button title="Xem thông tin tour" secondary onPress={() => onOpen(tour)} />}
      </Card>
    </View>
  );
}
export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Tour>();
  const pendingIds = useRef(new Set<string>());
  const lifecycle = useRef({ mounted: false, sequence: 0, busy: false });
  const load = useCallback(async (refresh = false) => {
    const life = lifecycle.current;
    if (pendingIds.current.size || life.busy) return;
    life.busy = true;
    const id = ++life.sequence;
    setError('');
    setLoading(!refresh);
    setRefreshing(refresh);
    try {
      const data = await getTours();
      if (life.mounted && id === life.sequence) setTours(data);
    } catch (cause) {
      if (life.mounted && id === life.sequence) setError(errorMessage(cause));
    } finally {
      if (life.mounted && id === life.sequence) {
        setLoading(false);
        setRefreshing(false);
        life.busy = false;
      }
    }
  }, []);
  useEffect(() => {
    const life = lifecycle.current;
    life.mounted = true;
    life.busy = true;
    const id = ++life.sequence;
    void getTours()
      .then((data) => {
        if (life.mounted && id === life.sequence) setTours(data);
      })
      .catch((cause) => {
        if (life.mounted && id === life.sequence) setError(errorMessage(cause));
      })
      .finally(() => {
        if (life.mounted && id === life.sequence) {
          setLoading(false);
          life.busy = false;
        }
      });
    return () => {
      life.mounted = false;
      life.sequence++;
      life.busy = false;
    };
  }, []);
  const toggle = async (tour: Tour) => {
    if (pendingIds.current.has(tour.id) || lifecycle.current.busy) return;
    pendingIds.current.add(tour.id);
    setPending(new Set(pendingIds.current));
    setError('');
    const next = !tour.isFavorite;
    setTours((items) =>
      items.map((item) => (item.id === tour.id ? { ...item, isFavorite: next } : item)),
    );
    try {
      await saveFavorite(tour.id, next, simulateFailure);
    } catch (cause) {
      if (lifecycle.current.mounted) {
        // Chỉ rollback bản ghi thất bại, giữ thay đổi của những tour khác.
        setTours((items) =>
          items.map((item) =>
            item.id === tour.id ? { ...item, isFavorite: tour.isFavorite } : item,
          ),
        );
        setError(errorMessage(cause));
      }
    } finally {
      pendingIds.current.delete(tour.id);
      if (lifecycle.current.mounted) setPending(new Set(pendingIds.current));
    }
  };
  const filtered = useMemo(
    () =>
      tours.filter((tour) =>
        tour.name.toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi')),
      ),
    [tours, query],
  );
  const sections = useMemo(() => groupTours(filtered), [filtered]);
  const favorites = useMemo(() => tours.filter((tour) => tour.isFavorite), [tours]);
  const locked = loading || refreshing;
  return (
    <Page scroll={false}>
      <SectionList
        sections={sections}
        keyExtractor={(tour) => tour.id}
        stickySectionHeadersEnabled
        contentContainerStyle={s.content}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void load(true)}
            enabled={!pending.size}
            tintColor={colors.teal}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: 14, paddingBottom: 16 }}>
            <Intro
              title="Một chuyến đi mới"
              subtitle="Tuần 8 · Tour Việt, SectionList & optimistic update"
            />
            <Text style={s.muted}>
              {tourEndpoint
                ? 'Nguồn: API riêng · cập nhật qua PUT'
                : 'Nguồn: dữ liệu mẫu · lưu yêu thích trong phiên chạy'}
            </Text>
            <Input
              accessibilityLabel="Tìm tour"
              placeholder="Tìm tour theo tên…"
              value={query}
              onChangeText={setQuery}
            />
            <View style={s.between}>
              <Text style={[s.muted, { flex: 1 }]}>Mô phỏng lỗi cập nhật để kiểm tra rollback</Text>
              <Switch
                accessibilityLabel="Mô phỏng lỗi cập nhật tour"
                value={simulateFailure}
                onValueChange={setSimulateFailure}
              />
            </View>
            <Button
              title="Tải lại tour"
              disabled={locked || pending.size > 0}
              onPress={() => void load(true)}
            />
            {error ? (
              <Text accessibilityRole="alert" style={s.error}>
                {error}
              </Text>
            ) : null}
            <Text style={s.heading}>Tour yêu thích ({favorites.length})</Text>
            <FlatList
              horizontal
              data={favorites}
              keyExtractor={(tour) => `favorite-${tour.id}`}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              ListEmptyComponent={<Text style={s.muted}>Chưa có tour yêu thích.</Text>}
              renderItem={({ item }) => (
                <TourCard
                  tour={item}
                  compact
                  pending={pending.has(item.id)}
                  locked={locked}
                  onToggle={(tour) => void toggle(tour)}
                  onOpen={setSelected}
                />
              )}
            />
            {loading && <ActivityIndicator size="large" color={colors.teal} />}
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={{ paddingVertical: 14, backgroundColor: colors.bg }}>
            <Text style={s.heading}>
              {section.title} · {section.data.length} tour
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TourCard
            tour={item}
            pending={pending.has(item.id)}
            locked={locked}
            onToggle={(tour) => void toggle(tour)}
            onOpen={setSelected}
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <Empty
              text={
                error && !tours.length
                  ? 'Chưa tải được tour. Kiểm tra API rồi nhấn tải lại.'
                  : 'Không tìm thấy tour phù hợp.'
              }
            />
          ) : undefined
        }
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
            <Text style={s.title}>{selected?.name}</Text>
            <Text style={s.text}>
              {selected?.city} · {selected?.days} ngày
            </Text>
            <Text style={s.text}>Khởi hành: {selected?.departure}</Text>
            <Text style={s.heading}>{money(selected?.price ?? 0)}</Text>
            <Button title="Đóng thông tin" onPress={() => setSelected(undefined)} />
          </Card>
        </View>
      </Modal>
    </Page>
  );
}
