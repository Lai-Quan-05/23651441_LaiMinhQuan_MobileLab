import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';

export const PHONE_COLORS: Record<
  string,
  {
    id: string;
    name: string;
    image: any;
    colorCode: string;
    provider: string;
    price: string;
  }
> = {
  blue: {
    id: 'blue',
    name: 'xanh',
    image: require('../image/xanh.png'),
    colorCode: '#234896',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
  },
  silver: {
    id: 'silver',
    name: 'bạc',
    image: require('../image/bac.png'),
    colorCode: '#C5F1FB',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
  },
  red: {
    id: 'red',
    name: 'đỏ',
    image: require('../image/do.png'),
    colorCode: '#F30D0D',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
  },
  black: {
    id: 'black',
    name: 'đen',
    image: require('../image/den.png'),
    colorCode: '#000000',
    provider: 'Tiki Tradding',
    price: '1.790.000 đ',
  },
};

export default function Screen1({ navigation: propNav }: { navigation?: any }) {
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

  const [selectedColorKey, setSelectedColorKey] = useState<string>('blue');
  const [customImage, setCustomImage] = useState<any>(null);
  const [hasSelectedColor, setHasSelectedColor] = useState<boolean>(false);

  // Sync params when returning from Screen 2
  useEffect(() => {
    const colorKey = localParams?.selectedColor;
    const message = localParams?.message;

    if (colorKey && PHONE_COLORS[colorKey]) {
      setSelectedColorKey(colorKey);
      setCustomImage(null);
      setHasSelectedColor(true);
    } else if (message) {
      if (typeof message === 'string' && PHONE_COLORS[message]) {
        setSelectedColorKey(message);
        setCustomImage(null);
        setHasSelectedColor(true);
      } else {
        setCustomImage(message);
        setHasSelectedColor(true);
      }
    }
  }, [localParams]);

  const currentImage =
    customImage || PHONE_COLORS[selectedColorKey]?.image || PHONE_COLORS.blue.image;

  const handleNavigateToOption = () => {
    if (router && typeof router.push === 'function') {
      router.push({
        pathname: '/week5/option',
        params: { selectedColor: selectedColorKey },
      });
      return;
    }

    if (navigation && typeof navigation.navigate === 'function') {
      try {
        navigation.navigate('option', { selectedColor: selectedColorKey });
      } catch (e) {}
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={currentImage} style={styles.productImage} resizeMode="contain" />
        </View>

        {/* Product Title */}
        <Text style={styles.productTitle}>
          Điện Thoại Vsmart Joy 3 - Hàng chính hãng
        </Text>

        {/* Rating and Review Count */}
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            <Image source={require('../image/Star.png')} style={styles.starIcon} />
            <Image source={require('../image/Star.png')} style={styles.starIcon} />
            <Image source={require('../image/Star.png')} style={styles.starIcon} />
            <Image source={require('../image/Star.png')} style={styles.starIcon} />
            <Image source={require('../image/Star.png')} style={styles.starIcon} />
          </View>
          <Text style={styles.reviewText}>(Xem 828 đánh giá)</Text>
        </View>

        {/* Pricing */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>1.790.000 đ</Text>
          <Text style={styles.oldPrice}>1.790.000 đ</Text>
        </View>

        {/* Price Guarantee */}
        <View style={styles.guaranteeRow}>
          <Text style={styles.guaranteeText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <Image source={require('../image/Group.png')} style={styles.questionIcon} />
        </View>

        {/* Choose Color Button */}
        <TouchableOpacity
          style={styles.chooseColorButton}
          activeOpacity={0.7}
          onPress={handleNavigateToOption}
        >
          <Text style={styles.chooseColorText}>
            {hasSelectedColor ? '4 MÀU-CHỌN LOẠI' : '4 MÀU-CHỌN MÀU'}
          </Text>
          <Image source={require('../image/Vector.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  productImage: {
    width: 270,
    height: 330,
  },
  productTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: '#000000',
    fontWeight: '400',
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 23,
    height: 25,
    marginRight: 2,
    resizeMode: 'contain',
  },
  reviewText: {
    fontSize: 15,
    color: '#000000',
    marginLeft: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  oldPrice: {
    fontSize: 15,
    color: '#7D7B7B',
    textDecorationLine: 'line-through',
    marginLeft: 35,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  guaranteeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FA0000',
  },
  questionIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    resizeMode: 'contain',
  },
  chooseColorButton: {
    width: '100%',
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.46)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chooseColorText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  arrowIcon: {
    position: 'absolute',
    right: 18,
    width: 12,
    height: 14,
    resizeMode: 'contain',
  },
  buyButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#EE0A0A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
    shadowColor: '#EE0A0A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});