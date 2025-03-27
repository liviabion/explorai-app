import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/contexts/auth-context';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(); // atualiza estado global
    router.replace('/home'); // navega para página protegida
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/iconExplorai.png')} style={styles.logo} />
      <Text style={styles.title}>EXPLORAI</Text>

      <TouchableOpacity style={styles.buttonWhite} onPress={handleLogin}>
        <Text style={styles.buttonTextDark}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRed}>
        <Text style={styles.buttonText}>CRIAR CONTA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBrown}>
        <Text style={styles.buttonText}>EXPLORAR COMO CONVIDADO</Text>
      </TouchableOpacity>

      <Text style={styles.version}>versão 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2C7C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 40,
  },
  buttonWhite: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonRed: {
    backgroundColor: '#E63946',
    paddingVertical: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonBrown: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#0A2C7C',
    fontWeight: 'bold',
  },
  version: {
    color: '#FFFFFF',
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
  },
});
