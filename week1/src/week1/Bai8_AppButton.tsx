import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: '#4f46e5', text: '#ffffff' },
  secondary: { bg: '#6b7280', text: '#ffffff' },
  outline: { bg: 'transparent', text: '#4f46e5', border: '#4f46e5' },
  danger: { bg: '#ef4444', text: '#ffffff' },
};

const sizeStyles: Record<ButtonSize, { padding: number; fontSize: number }> = {
  small: { padding: 6, fontSize: 12 },
  medium: { padding: 10, fontSize: 16 },
  large: { padding: 14, fontSize: 18 },
};

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}: AppButtonProps) => {
  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        backgroundColor: currentVariant.bg,
        borderWidth: currentVariant.border ? 1 : 0,
        borderColor: currentVariant.border,
        padding: currentSize.padding,
        borderRadius: 6,
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color={currentVariant.text} />
      ) : (
        <Text style={{ color: currentVariant.text, fontSize: currentSize.fontSize, fontWeight: 'bold' }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <AppButton 
        title="Thêm vào giỏ hàng" 
        variant="primary" 
        size="large" 
        onPress={() => alert('Đã thêm')} 
      />
      <AppButton 
        title="Xem chi tiết" 
        variant="outline" 
        size="medium" 
        onPress={() => alert('Xem chi tiết')} 
      />
      <AppButton 
        title="Xóa sách" 
        variant="danger" 
        size="small" 
        onPress={() => alert('Đã xóa')} 
      />
      <AppButton 
        title="Đang tải..." 
        variant="primary" 
        loading={true} 
        onPress={() => {}} 
      />
    </View>
  );
};

export default App;