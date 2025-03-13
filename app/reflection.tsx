import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function ReflectionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>Home Screen</ThemedText>
    </View>
  );
}
