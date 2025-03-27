import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === 'home') iconName = 'home';
          else if (route.name === 'store') iconName = 'cart';
          else if (route.name === 'profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: (() => {
          if (route.name === 'home') return 'Home';
          if (route.name === 'store') return 'Loja';
          if (route.name === 'profile') return 'Perfil';
        })(),
      })}
    />
  );
}
