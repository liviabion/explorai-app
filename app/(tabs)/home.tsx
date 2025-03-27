import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';

const user = {
  name: 'Folião Brincante',
  points: 500,
  level: 'Nível Peneira',
};

const recentQuizzes = [
  {
    title: 'Ritmos de Maracatu',
    description: 'Aprendendo os toques do Maracatu',
    color: Colors.softRed,
  },
  {
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
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem vindo de volta</Text>
        <View style={styles.userBox}>
          <View style={styles.userIcon} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPoints}>Pontuação: {user.points} - {user.level}</Text>
          </View>
        </View>

      <Text style={styles.sectionTitle}>Ultimas interações</Text>
      {recentQuizzes.map((quiz, index) => (
        <View key={index} style={[styles.quizBox, { backgroundColor: quiz.color }]}> 
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <Text style={styles.quizDescription}>{quiz.description}</Text>
        </View>
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
    paddingTop: 70,
  },
  welcome: {
    color: Colors.blueDark,
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    marginBottom: 12,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
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