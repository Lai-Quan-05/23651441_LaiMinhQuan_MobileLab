import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '../../components/ui';
import { useAppSelector } from '../../weeks/week9/hooks';
import { selectCartCount } from '../../weeks/week9/store';
export default function ReduxTabs() {
  const count = useAppSelector(selectCartCount);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sách',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>▤</Text>,
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Counter',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>±</Text>,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarBadge: count || undefined,
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>▢</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>◎</Text>,
        }}
      />
    </Tabs>
  );
}
