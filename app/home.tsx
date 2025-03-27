import { View, Text, Button } from 'react-native';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';

export default function Home() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Bem-vinda ao Explorai!</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
