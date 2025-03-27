import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import { useUser } from '@/contexts/user-context';

const journeys = [
  {
    id: 1,
    title: 'MAPA DO FOGUETE',
    description: 'COMPLETOU TODOS OS DESAFIOS',
    color: Colors.softRed,
    stars: 3,
  },
  {
    id: 2,
    title: 'ROTA DOS ENGENHOS',
    description: 'COMPLETOU 4 DE 8 DESAFIOS',
    color: Colors.blue,
    stars: 2,
  },
];

const collected = [
  {
    name: 'Maracatu',
    image: require('@/assets/images/alfaia.png'),
  },
  {
    name: 'Maracatu',
    image: require('@/assets/images/alfaia.png'),
  },
  {
    name: 'Maracatu',
    image: require('@/assets/images/alfaia.png'),
  },
  {
    name: 'Maracatu',
    image: require('@/assets/images/alfaia.png'),
  },
];

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.level}>Nível {user.level} - {user.points} pontos</Text>
        <Text style={styles.nextLevel}>{user.nextLevelPoints - user.points} pontos para o próximo nível</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(user.points / user.nextLevelPoints) * 100}%` }]} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jornadas Concluídas</Text>
        {journeys.map(journey => (
          <View key={journey.id} style={[styles.journeyCard, { backgroundColor: journey.color }]}>
            <Text style={styles.journeyTitle}>{journey.title}</Text>
            <Text style={styles.journeyDescription}>{journey.description}</Text>
            <Text style={styles.journeyStars}>{'★'.repeat(journey.stars)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recompensas Coletadas</Text>
        <FlatList
          data={collected}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.rewardCard}>
              <Image source={item.image} style={styles.rewardImage} />
              <Text style={styles.rewardLabel}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blueDark,
  },
  level: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    marginBottom: 4,
  },
  nextLevel: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 6,
  },
  progressBarContainer: {
    height: 6,
    width: '80%',
    backgroundColor: Colors.gray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.blueDark,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  journeyCard: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  journeyTitle: {
    fontFamily: Fonts.primary,
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
  },
  journeyDescription: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    color: Colors.white,
    marginTop: 2,
  },
  journeyStars: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.white,
  },
  rewardBlock: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  rewardCard: {
    width: 80,
    alignItems: 'center',
    backgroundColor: Colors.softRed,
    borderRadius: 8,
  },
  rewardImage: {
    width: 50,
    height: 50,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  rewardLabel: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.black,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: Colors.softRed,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    fontFamily: Fonts.primary,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
