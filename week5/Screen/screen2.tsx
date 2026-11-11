import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { PHONE_COLORS } from './screen1';

const COLOR_OPTIONS = [
  PHONE_COLORS.silver, // #C5F1FB
  PHONE_COLORS.red,    // #F30D0D
  PHONE_COLORS.black,  // #000000
  PHONE_COLORS.blue,   // #234896
];

export default function Screen2({ navigation: propNav }: { navigation?: any }) {
  let navFromHook: any = null;
  try {
    navFromHook = useNavigation();
  } catch (e) {}

  let router: any = null;
  try {
    router = useRouter();
  } catch (e) {}

  let localParams: any = {};
  try {
    localParams = useLocalSearchParams();
  } catch (e) {}

  const navigation = propNav || navFromHook;

  const initialColor = (localParams?.selectedColor as string) || 'blue';

  const [selectedColorKey, setSelectedColorKey] = useState<string>(initialColor);
  const [hasPickedColor, setHasPickedColor] = useState<boolean>(true);

  const selectedItem = PHONE_COLORS[selectedColorKey] || PHONE_COLORS.blue;

  const handleSelectColor = (colorId: string) => {
    setSelectedColorKey(colorId);
    setHasPickedColor(true);
  };

  const handleDone = () => {
    // Navigate back to index with selected color via Expo Router
    if (router && typeof router.navigate === 'function') {
      router.navigate({
        pathname: '/week5',
        params: {
          selectedColor: selectedColorKey,
        },
      });
      return;
    }

    if (router && typeof router.replace === 'function') {
      router.replace({
        pathname: '/week5',
        params: {
          selectedColor: selectedColorKey,
        },
      });
      return;
    }

    // Fallback to navigation if available
    if (navigation && typeof navigation.navigate === 'function') {
      try {
        navigation.navigate('index', {
          selectedColor: selectedColorKey,
          message: selectedItem.image,
        });
      } catch (e) {}
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Product Summary Card */}
        <View style={styles.topCard}>
          <Image
            source={selectedItem.image}
            style={styles.thumbnailImage}
            resizeMode="contain"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.productTitle}>Điện Thoại Vsmart Joy 3</Text>
            <Text style={styles.productSubtitle}>Hàng chính hãng</Text>

            {hasPickedColor && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Màu: </Text>
                  <Text style={styles.infoValue}>{selectedItem.name}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cung cấp bởi </Text>
                  <Text style={styles.infoValue}>{selectedItem.provider}</Text>
                </View>

                <Text style={styles.priceText}>{selectedItem.price}</Text>
              </>
            )}
          </View>
        </View>

        {/* Bottom Color Selection Area */}
        <View style={styles.bottomArea}>
          <Text style={styles.sectionTitle}>Chọn một màu bên dưới:</Text>

          <View style={styles.colorsContainer}>
            {COLOR_OPTIONS.map((item) => {
              const isSelected = selectedColorKey === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectColor(item.id)}
                  style={[
                    styles.colorBox,
                    { backgroundColor: item.colorCode },
                    isSelected && styles.selectedColorBox,
                  ]}
                />
              );
            })}
          </View>

          {/* Button XONG */}
          <TouchableOpacity
            style={styles.doneButton}
            activeOpacity={0.8}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>XONG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  thumbnailImage: {
    width: 110,
    height: 135,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
  productTitle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  productSubtitle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 15,
    color: '#000000',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 6,
  },
  bottomArea: {
    flex: 1,
    backgroundColor: '#C4C4C4',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
    marginBottom: 6,
  },
  colorsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  colorBox: {
    width: 85,
    height: 80,
    marginVertical: 6,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedColorBox: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.05 }],
  },
  doneButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#1952E2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0B2D82',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});