import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/user-context';
import quizzes from '@/data/quizzes';

const recentQuizIds = [1, 2];

const recentRewards = [
  {
    name: 'Maracatu',
    image: require('@/assets/images/alfaia.png'),
    color: Colors.softRed,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();

  const recentQuizzes = recentQuizIds.map(id => ({
    id,
    title: quizzes[id].title,
    category: quizzes[id].category,
    color: id === 1 ? Colors.softRed : Colors.blue,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem vindo de volta!</Text>
      <View style={styles.userBox}>
        <Image source={user.avatar} style={styles.userIcon} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPoints}>Pontuação: {user.points} - Nível {user.level}</Text>
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
            <Text style={styles.quizDescription}>{quiz.category}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Medalhas recentes</Text>
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
    color: Colors.blueAlt,
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    marginBottom: 12,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
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
    fontSize: 20,
    fontFamily: Fonts.semiBold,
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
    fontFamily: Fonts.semiBold,
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
    fontFamily: Fonts.medium,
    color: Colors.black,
    fontSize: 13,
    fontWeight: '500',
  },
});
