import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/auth-context';

function LayoutWithAuth() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="home" />
      ) : (
        <Stack.Screen name="index" /> // Login como tela inicial
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutWithAuth />
    </AuthProvider>
  );
}
