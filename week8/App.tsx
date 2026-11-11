import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TourItem from './components/TourItem';
import { Tour, formatDate, formatPrice, groupByCity } from './utils/tour';

const API_URL = 'https://6abb57aeb2118ed7abb84828.mockapi.io/tours'; // Hoặc IP máy chủ / json-server

export default function App() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch dữ liệu danh sách tour từ API
  const fetchTours = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Không thể tải danh sách tour');
      const data: Tour[] = await response.json();
      setTours(data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ!');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTours();
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };
  
  // Sử dụng trong hàm handlePressTour:
  const handlePressTour = useCallback((tour: Tour) => {
    showAlert(
      tour.name,
      `Khởi hành: ${formatDate(tour.departure)}\nThời gian: ${tour.days} ngày\nGiá: ${formatPrice(tour.price)}`
    );
  }, []);

  // Câu 5: Cập nhật yêu thích (PUT + Lạc quan)
  const handleToggleFavorite = useCallback(
    async (id: string, next: boolean) => {
      // Lưu lại trạng thái cũ phòng khi rollback
      let previousTours: Tour[] = [];

      setTours((prev) => {
        previousTours = prev;
        return prev.map((item) =>
          item.id === id ? { ...item, isFavorite: next } : item
        );
      });

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isFavorite: next }),
        });

        if (!response.ok) {
          throw new Error('Cập nhật thất bại');
        }
      } catch (error) {
        // Rollback lại dữ liệu cũ khi có lỗi
        setTours(previousTours);
        Alert.alert('Lỗi', 'Không thể cập nhật trạng thái yêu thích!');
      }
    },
    []
  );

  // Câu 6a: Lọc tour theo tên bằng useMemo
  const filteredTours = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tours;
    return tours.filter((tour) => tour.name.toLowerCase().includes(query));
  }, [tours, searchQuery]);

  // Nhóm các tour đã lọc theo thành phố
  const groupedData = useMemo(() => {
    return groupByCity(filteredTours);
  }, [filteredTours]);

  // Lấy danh sách tour yêu thích (không bị ảnh hưởng bởi ô tìm kiếm)
  const favoriteTours = useMemo(() => {
    return tours.filter((tour) => tour.isFavorite);
  }, [tours]);

  // Câu 4c: Header chứa danh sách tour yêu thích nằm ngang
  const renderListHeader = () => (
    <View style={styles.favoriteSection}>
      <Text style={styles.sectionTitle}>
        Tour yêu thích ({favoriteTours.length})
      </Text>
      {favoriteTours.length === 0 ? (
        <Text style={styles.emptyFavoriteText}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          data={favoriteTours}
          keyExtractor={(item) => `fav-${item.id}`}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact={true}
              onPress={handlePressTour}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          contentContainerStyle={{ paddingVertical: 5 }}
        />
      )}
      <View style={styles.divider} />
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Câu 1c: Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tour Việt</Text>
          <Text style={styles.studentInfo}>MSSV: 23651441 - Lại Minh Quân</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm tour theo tên..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Câu 2c: ActivityIndicator */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <SectionList
            sections={groupedData}
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled={true}
            ListHeaderComponent={renderListHeader}
            renderSectionHeader={({ section: { title, data } }) => (
              <View style={styles.groupHeader}>
                <Text style={styles.groupHeaderTitle}>
                  {title} · {data.length} tour
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TourItem
                tour={item}
                compact={false}
                onPress={handlePressTour}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  studentInfo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginVertical: 4,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginTop: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  favoriteSection: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  emptyFavoriteText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 12,
  },
  groupHeader: {
    backgroundColor: '#e9ecef',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginVertical: 6,
  },
  groupHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#777',
  },
});