import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

const LiveInput = () => {
  const [text, setText] = useState<string>('');

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
        placeholder="Nhập chữ vào đây..."
        onChangeText={(value: string) => setText(value)}
        value={text}
      />
      <Text style={{ marginTop: 10, fontSize: 16 }}>
        Số ký tự: {text.length}
      </Text>
    </View>
  );
};

export default LiveInput;