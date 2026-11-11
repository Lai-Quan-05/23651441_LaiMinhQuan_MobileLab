import { NavigationContext } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bike, RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
type Props = NativeStackScreenProps<RootStackParamList, 'Screen_2'>
const bikes : Bike[] = [
  { id: '1', name: 'Pinarello', price: '1800', image: require('../assets/image/bifour_-removebg-preview.png') },
  { id: '2', name: 'Pina Mountain', price: '1700', image: require('../assets/image/bione-removebg-preview.png') },
  { id: '3', name: 'Pina Bike', price: '1500', image: require('../assets/image/bithree_removebg-preview.png') },
  { id: '4', name: 'Pinarello', price: '1900', image: require('../assets/image/bitwo-removebg-preview.png') },
  { id: '5', name: 'Pinarello', price: '1800', image: require('../assets/image/bifour_-removebg-preview.png') },
  { id: '6', name: 'Pina Mountain', price: '1700', image: require('../assets/image/bione-removebg-preview.png') },

];

const Screen_2 = ({navigation}: Props) => {
  const renderItem : ListRenderItem<Bike> = ({item}) => (
    <TouchableOpacity
      style = {styles.card}
      onPress={() => navigation.navigate('Screen_3', {bike:item})}
    >
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={16} color="#000" />
      </TouchableOpacity>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>
        <Text style={styles.currency}>$</Text>{item.price}
      </Text>
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>The world's Best Bike</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}>
          <Text style={styles.activeText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Mountain</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bikes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
export default Screen_2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E94141',
    marginVertical: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#E94141',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeFilter: {
    backgroundColor: '#FFE5E5',
  },
  filterText: {
    color: '#BEBEBE',
  },
  activeText: {
    color: '#E94141',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    padding: 10,
    width: '48%',
    marginBottom: 15,
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  cardImage: {
    width: '100%',
    height: 100,
    marginVertical: 10,
  },
  bikeName: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  bikePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  currency: {
    color: '#F7BA83',
  },
});