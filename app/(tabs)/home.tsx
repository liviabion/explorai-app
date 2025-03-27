import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import { useRouter } from 'expo-router';

const user = {
  name: 'Folião Brincante',
  points: 500,
  level: 'Nível Peneira',
};

const recentQuizzes = [
  {
    id: 1,
    title: 'Ritmos de Maracatu',
    description: 'Aprendendo os toques do Maracatu',
    color: Colors.softRed,
  },
  {
    id: 2,
    title: 'Rotas dos engenhos',
    description: '4/8 concluído',
    color: Colors.blue,
  },
];

const recentRewards = [
  {
    name: 'Cabelo',
    image: require('@/assets/images/icon.png'),
    color: Colors.softRed,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem vindo de volta</Text>
        <View style={styles.userBox}>
          <View style={styles.userIcon} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPoints}>Pontuação: {user.points} - {user.level}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Últimas interações</Text>
      {recentQuizzes.map((quiz, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => router.push(`/quiz?quizId=${quiz.id}`)}
          activeOpacity={0.8}
        >
          <View style={[styles.quizBox, { backgroundColor: quiz.color }]}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizDescription}>{quiz.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Recompensas recentes</Text>
      <FlatList
        data={recentRewards}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.rewardBox, { backgroundColor: item.color }]}>
            <Image source={item.image} style={styles.rewardImage} />
            <Text style={styles.rewardText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    backgroundColor: Colors.blueDark,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  welcome: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
  },
  userIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.softRed,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: Fonts.primary,
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.blueDark,
    marginBottom: 2,
  },
  userPoints: {
    fontFamily: Fonts.primary,
    fontSize: 13,
    color: Colors.darkGray,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Fonts.primary,
    fontWeight: '700',
    marginBottom: 10,
    color: Colors.black,
  },
  quizBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  quizTitle: {
    fontFamily: Fonts.primary,
    fontSize: 14,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quizDescription: {
    fontFamily: Fonts.primary,
    fontSize: 12,
    color: Colors.white,
  },
  rewardBox: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardImage: {
    width: 48,
    height: 48,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  rewardText: {
    fontFamily: Fonts.primary,
    color: Colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
});
