import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Số lượng: {count}</Text>
      
      <Button title="Tăng" onPress={() => setCount(count + 1)} />
      
      <Button 
        title="Giảm" 
        onPress={() => setCount(count - 1)} 
        disabled={count <= 0} 
      />
    </View>
  );
};

export default Counter;