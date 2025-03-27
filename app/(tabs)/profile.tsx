import { View, Text, Button } from 'react-native';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Seu perfil</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}
