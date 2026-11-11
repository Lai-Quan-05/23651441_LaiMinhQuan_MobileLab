import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

type LoadingProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

const LoadingContainer = ({ isLoading, children }: LoadingProps) => {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }
  return <View>{children}</View>;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <View style={{ padding: 20, gap: 15 }}>
      <Button 
        title={loading ? "Tắt Loading" : "Bật Loading"} 
        onPress={() => setLoading(!loading)} 
      />

      <LoadingContainer isLoading={loading}>
        <Text style={{ fontSize: 18 }}>Nội dung đã được tải xong!</Text>
      </LoadingContainer>
    </View>
  );
};

export default App;