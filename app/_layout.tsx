import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/auth-context';

// Impede que a splash desapareça automaticamente
SplashScreen.preventAutoHideAsync();

function ProtectedLayout() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="index" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // evita que a UI apareça sem fonte
  }

  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
