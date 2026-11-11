import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Tour, formatDate, formatPrice, getSeatLabel } from '../utils/tour';

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

const TourItem: React.FC<TourItemProps> = ({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}) => {
  const isWarningSeat = tour.seats <= 3;

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.card, styles.compactCard]}
        onPress={() => onPress(tour)}
        activeOpacity={0.8}
      >
        <View style={styles.compactImageContainer}>
          <Image source={{ uri: tour.image }} style={styles.compactImage} />
          <TouchableOpacity
            testID="fav-btn"
            style={styles.compactFavBtn}
            onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favIcon}>{tour.isFavorite ? '♥' : '♡'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>
            {tour.name}
          </Text>
          <Text style={styles.price}>{formatPrice(tour.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, styles.fullCard]}
      onPress={() => onPress(tour)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: tour.image }} style={styles.fullImage} />

      <View style={styles.fullInfo}>
        <Text style={styles.fullName} numberOfLines={2}>
          {tour.name}
        </Text>
        <Text style={styles.cityText}>{tour.city}</Text>
        <Text style={styles.dateText}>
          📅 {formatDate(tour.departure)} · {tour.days} ngày
        </Text>
        <View style={styles.priceSeatRow}>
          <Text style={styles.price}>{formatPrice(tour.price)}</Text>
          <Text style={[styles.seatText, isWarningSeat && styles.warningSeat]}>
            {getSeatLabel(tour.seats)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        testID="fav-btn"
        style={styles.fullFavBtn}
        onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.favIcon}>{tour.isFavorite ? '♥' : '♡'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  // Compact styles
  compactCard: {
    width: 160,
    marginBottom: 0,
  },
  compactImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 4 / 3,
  },
  compactImage: {
    width: '100%',
    height: '100%',
  },
  compactFavBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactInfo: {
    padding: 8,
  },
  compactName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },

  // Full styles
  fullCard: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  fullImage: {
    width: 90,
    height: 90,
    borderRadius: 6,
  },
  fullInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  fullName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
  },
  cityText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  priceSeatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  seatText: {
    fontSize: 11,
    color: '#2e7d32',
    fontWeight: '500',
  },
  warningSeat: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  fullFavBtn: {
    padding: 8,
  },
  favIcon: {
    fontSize: 20,
    color: '#e91e63',
  },
});

export default React.memo(TourItem);