import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { decrement, increment, incrementByAmount, reset } from '../store/counterSlice';
import { useAppDispatch, useAppSelector } from '../store/index';

export default function CounterScreen() {
  const dispatch = useAppDispatch();
  
  const count = useAppSelector((state) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Counter</Text>
      <Text style={styles.counterText}>{count}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.decrementBtn]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.btnText}>- Giảm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementBtn]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.btnText}>+ Tăng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.addFiveBtn]}
          onPress={() => dispatch(incrementByAmount(5))}
        >
          <Text style={styles.btnText}>+ 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetBtn]}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counterText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  incrementBtn: {
    backgroundColor: '#34C759',
  },
  decrementBtn: {
    backgroundColor: '#FF9500',
  },
  addFiveBtn: {
    backgroundColor: '#007AFF',
  },
  resetBtn: {
    backgroundColor: '#FF3B30',
  },
});