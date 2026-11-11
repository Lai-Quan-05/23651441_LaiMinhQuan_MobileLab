import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';

export interface Movie {
  id: string | number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}
export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string | number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  const handlePress = () => {
    onSelect(movie.id);
    Alert.alert('Chi tiết phim', `Bạn đã chọn phim: ${movie.title}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card style={[styles.card, isTile && styles.cardTile]}>
        <View style={[styles.container, isTile && styles.containerTile]}>
        
          <Image 
            source={{ uri: movie.poster }} 
            style={[styles.poster, isTile ? styles.posterTile : styles.posterRow]} 
          />
          {isTile && (
            <View style={styles.badgeRating}>
              <Text style={styles.badgeText}>⭐ {movie.rating.toFixed(1)}</Text>
            </View>
          )}

          <View style={[styles.infoContainer, isTile && styles.infoContainerTile]}>
            <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
            {!isTile && (
              <Text style={styles.subText}>Thể loại: {movie.genre} | Năm: {movie.year}</Text>
            )}

            <View style={styles.row}>       
              {!isTile && (
                <Text style={styles.rating}>{movie.rating.toFixed(1)} ⭐</Text>
              )}
              <Text style={styles.status}>
                {movie.isShowing ? 'Đang chiếu' : 'Ngừng chiếu'}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardTile: {
    flex: 1,
    margin: 4,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  containerTile: {
    flexDirection: 'column',
    padding: 0,
    alignItems: 'stretch',
    position: 'relative',
  },
  poster: {
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  posterRow: {
    width: 70,
    height: 100,
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  badgeRating: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  infoContainerTile: {
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e67e22',
  },
  status: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
});

export default React.memo(MovieCard);