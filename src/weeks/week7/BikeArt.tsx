import { View } from 'react-native';
export default function BikeArt({ color = '#c6e5de' }: { color?: string }) {
  return (
    <View
      accessibilityLabel="Minh họa xe đạp"
      style={{
        height: 170,
        borderRadius: 14,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 240, height: 120 }}>
        <View
          style={{
            position: 'absolute',
            width: 76,
            height: 76,
            borderWidth: 5,
            borderColor: '#263b48',
            borderRadius: 38,
            left: 8,
            bottom: 0,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 76,
            height: 76,
            borderWidth: 5,
            borderColor: '#263b48',
            borderRadius: 38,
            right: 8,
            bottom: 0,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 78,
            height: 65,
            borderWidth: 5,
            borderColor: '#227b7b',
            left: 68,
            bottom: 25,
            transform: [{ skewX: '-25deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 5,
            height: 88,
            backgroundColor: '#227b7b',
            left: 174,
            bottom: 27,
            transform: [{ rotate: '-22deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 32,
            height: 7,
            borderRadius: 4,
            backgroundColor: '#263b48',
            left: 64,
            top: 14,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 29,
            height: 6,
            borderRadius: 4,
            backgroundColor: '#263b48',
            left: 159,
            top: 2,
          }}
        />
      </View>
    </View>
  );
}
