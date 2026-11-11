import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
type Gender = 'male' | 'female' | 'other';

const GenderSelector = () => {
  const [gender, setGender] = useState<Gender>('male');

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Giới tính đã chọn: {gender}
      </Text>

      <Button title="Nam (male)" onPress={() => setGender('male')} />
      <Button title="Nữ (female)" onPress={() => setGender('female')} />
      <Button title="Khác (other)" onPress={() => setGender('other')} />
    </View>
  );
};

export default GenderSelector;