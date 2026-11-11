import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const colors = {
  ink: '#142f3d',
  muted: '#5b6c76',
  teal: '#087e82',
  pale: '#e5f4f1',
  line: '#dce6e9',
  bg: '#f4f7f8',
  red: '#a82b3b',
};
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.ink },
  heading: { fontSize: 19, fontWeight: '700', color: colors.ink },
  text: { fontSize: 15, lineHeight: 23, color: colors.ink },
  muted: { fontSize: 14, lineHeight: 21, color: colors.muted },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 18,
    gap: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#afc5cd',
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.ink,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.teal,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 17,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '700' },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 24,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.line,
  },
  selected: { backgroundColor: colors.pale, borderColor: colors.teal },
  error: { color: colors.red, fontSize: 14, lineHeight: 21 },
  hero: { backgroundColor: colors.ink, padding: 24, borderRadius: 22, gap: 12 },
  number: { fontSize: 48, fontWeight: '800', color: colors.teal, textAlign: 'center' },
});

export function Page({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  return (
    <SafeAreaView style={s.page} edges={['bottom', 'left', 'right']}>
      {scroll ? (
        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}
export function Card({ children }: PropsWithChildren) {
  return <View style={s.card}>{children}</View>;
}
export function Button({
  title,
  onPress,
  disabled = false,
  secondary = false,
  busy = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  busy?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || busy, busy }}
      onPress={onPress}
      disabled={disabled || busy}
      style={({ pressed }) => [
        s.button,
        secondary && { backgroundColor: colors.ink },
        { opacity: disabled || busy ? 0.45 : pressed ? 0.75 : 1 },
      ]}
    >
      {busy ? <ActivityIndicator color="white" /> : <Text style={s.buttonText}>{title}</Text>}
    </Pressable>
  );
}
export function Input(props: TextInputProps) {
  return (
    <TextInput placeholderTextColor={colors.muted} {...props} style={[s.input, props.style]} />
  );
}
export function Chip({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[s.chip, active && s.selected]}
    >
      <Text style={[s.text, active && { color: colors.teal, fontWeight: '700' }]}>{title}</Text>
    </Pressable>
  );
}
export function Intro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.muted}>{subtitle}</Text>
    </View>
  );
}
export function Empty({ text = 'Chưa có dữ liệu.' }: { text?: string }) {
  return (
    <Card>
      <Text style={s.muted}>{text}</Text>
    </Card>
  );
}
