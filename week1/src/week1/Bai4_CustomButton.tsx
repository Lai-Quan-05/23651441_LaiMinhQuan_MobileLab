import React from 'react';
import { View, Button, Alert } from 'react-native';

interface MyButtonProps {
  label: string;
  onPress: () => void;
  color?: string; // Optional prop
}

const MyButton = ({ label, onPress, color = '#007AFF' }: MyButtonProps) => (
  <Button title={label} onPress={onPress} color={color} />
);

const App = () => {
  return (
    <View style={{ padding: 20, gap: 10 }}>
      <MyButton 
        label="Nút Xanh (Mặc định)" 
        onPress={() => Alert.alert('Nút màu xanh')} 
      />
      <MyButton 
        label="Nút Hồng" 
        color="#f194ff" 
        onPress={() => Alert.alert('Nút màu hồng')} 
      />
    </View>
  );
};

export default App;