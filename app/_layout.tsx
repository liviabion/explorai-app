import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const colors = {
  primary: '#1E3A8A',
  secondary: '#E63946',
  background: '#FEF2F2',
  card: '#FFFFFF',
  text: '#360B0B',
  border: '#CED4DA',
  notification: '#DC2626',
  black: '#000000',
  white: '#FFFFFF',
  grayLight: '#E5E7EB',
  grayDark: '#4B5563',
  pinkLight: '#FFF5EB',
  pinkDark: '#7F1D1D',
  blue: '#1E40AF',
  blueAlt: '#0A2C7C',
  brown: '#8B4513',
  lilac: '#9CA3AF',
  soft: '#F5F5F5',
};

const CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E3A8A',
    background: '#FEF2F2',
    card: '#FFFFFF',
    text: '#360B0B',
    border: '#CED4DA',
    notification: '#DC2626',
  },
};
