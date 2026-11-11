import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function BookGrid() {
  const books = [
    { 
      id: 1, 
      title: 'Sách giáo khoa Toán 1', 
      price: '15.000đ', 
      badge: '-20%', // Thêm nhãn giảm giá
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBB4LQTn0vRq4ydPLp-uTj_lEUHOHYWUU18JlCq5KuMw&s=10' 
    },
    { 
      id: 2, 
      title: 'Sách Văn học Việt Nam', 
      price: '45.000đ', 
      badge: 'Mới', // Thêm nhãn Mới
      image: 'https://img.magnific.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80' 
    },
    { 
      id: 3, 
      title: 'Truyện tranh Doraemon', 
      price: '20.000đ', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGjonZJfRQjZBT0XWai4YhqvFXy149y_TYJyJOriKO7_dd0W066SLGEbgt&s=10' 
    },
    { 
      id: 4, 
      title: 'Tiểu thuyết Đắc Nhân Tâm', 
      price: '86.000đ', 
      badge: '-10%', // Thêm nhãn giảm giá
      image: 'https://blog.imago-images.com/hs-fs/hubfs/imago0058449704h.jpg?width=760&height=505&name=imago0058449704h.jpg' 
    },
  ];

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.headerTitle}>Book Grid</Text>
      
      <View style={styles.container}>
        {books.map((item) => (
          <View key={item.id} style={styles.cardItem}>
            
            <View style={styles.coverContainer}>
              <Image 
                source={{ uri: item.image }} 
                style={styles.coverImage} 
                resizeMode="cover" 
              />
              
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>

            <View style={styles.infoContainer}>
              <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>

          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '48%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  coverContainer: {
    position: 'relative', 
    width: '100%',
    aspectRatio: 3 / 4,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
  },

  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#e74c3c', 
    borderRadius: 4,           
    paddingVertical: 3,        
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  infoContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 13,
    color: '#888',
  },
});
