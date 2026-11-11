import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider } from 'react-redux';
import { useCart } from './hooks/useCart';
import { store } from './store/index';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { BookCartScreen, CheckoutScreen } from './screens/BookCartScreen';
import CounterScreen from './screens/CounterScreen';
import { BookDetailScreen, HomeScreen } from './screens/HomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Danh Sách Sách' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Chi Tiết Sách' }} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartMain" component={BookCartScreen} options={{ title: 'Giỏ Hàng Sách' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Thanh Toán' }} />
    </Stack.Navigator>
  );
}

// Custom TabBar
function CustomTabBar({ state, navigation }: any) {
  const { totalQuantity } = useCart();

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
            <Text style={{ color: isFocused ? '#007AFF' : '#8E8E93', fontWeight: isFocused ? 'bold' : 'normal' }}>
              {route.name}
            </Text>
            {route.name === 'Giỏ hàng' && totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// 2. Đăng ký Tab "Counter" vào RootTabs
function RootTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Trang chủ" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Counter" component={CounterScreen} options={{ title: 'Đếm Số (Counter)' }} />
      <Tab.Screen name="Giỏ hàng" component={CartStack} options={{ headerShown: false }} />
      <Tab.Screen name="Tài khoản" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootTabs />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabContainer: { flexDirection: 'row', height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 8, right: 14, backgroundColor: 'red', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});