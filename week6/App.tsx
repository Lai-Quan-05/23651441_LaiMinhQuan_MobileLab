import { StyleSheet, Text, View, FlatList, ActivityIndicator, Switch, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import MovieCard, { Movie } from './components/MovieCard';

export default function App() {
  const [list, setList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTile, setIsTile] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchMovies = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError(null);

      const res = await fetch('https://6abb57aeb2118ed7abb84828.mockapi.io/movies');
      if (!res.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await res.json();
      
      setList(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies(true);
  }, []);

  const handleSelectMovie = (id: string | number) => {
    console.log('Selected movie ID:', id);
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.centered]}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Loading movies...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error && !refreshing && list.length === 0) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.centered]}>
          <Text style={[styles.headerTitle, { color: 'red' }]}>Error: {error}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>MOVIE APP</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dạng lưới (2 cột)</Text>
            <Switch
              value={isTile}
              onValueChange={(value) => setIsTile(value)}
            />
          </View>
        </View>
        

        <FlatList
          key={String(numColumns)}
          data={list}
          numColumns={numColumns}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']} 
            />
          }
          renderItem={({ item }) => (
            <View style={[styles.itemContainer, isTile && styles.itemContainerTile]}>
              <MovieCard 
                movie={item} 
                layout={isTile ? 'tile' : 'row'} 
                onSelect={handleSelectMovie} 
              />
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  itemContainerTile: {
    maxWidth: '48%',
  },
});