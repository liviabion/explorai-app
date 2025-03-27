import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import quizzes from '@/data/quizzes';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams();
  const router = useRouter();
  const quiz = quizzes[quizId as keyof typeof quizzes];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timer, setTimer] = useState(quiz.timePerQuestion);

  const currentQuestion = quiz.questions[current];

  useEffect(() => {
    if (finished) return;
    if (timer === 0) {
      handleConfirm();
      return;
    }
    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, finished]);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === currentQuestion.correct) {
      setScore(prev => prev + Math.floor(quiz.totalPoints / quiz.questions.length));
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      if (current + 1 < quiz.questions.length) {
        setCurrent(prev => prev + 1);
        setSelected(null);
        setFeedback(null);
        setTimer(quiz.timePerQuestion);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.quizTitle}>Quiz Finalizado!</Text>
        <Text style={styles.pointsText}>Pontuação final: {score} pts</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}> 
          <Text style={styles.buttonText}>Voltar para Início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUIZ: {quiz.category.toUpperCase()}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{timer}s</Text>
          </View>
        </View>
      </View>

      <View style={styles.pointsBox}>
        <Text style={styles.pointsText}>{score} pts</Text>
      </View>

      <Text style={styles.questionTitle}>Pergunta {current + 1} de {quiz.questions.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <FlatList
        data={currentQuestion.options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isSelected = selected === index;
          const isCorrect = feedback === 'correct' && isSelected;
          const isWrong = feedback === 'incorrect' && isSelected;

          return (
            <TouchableOpacity
              disabled={feedback !== null}
              onPress={() => handleSelect(index)}
              style={[styles.option,
                isSelected && styles.optionSelected,
                isCorrect && { backgroundColor: 'green' },
                isWrong && { backgroundColor: 'red' },
              ]}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${((current + 1) / quiz.questions.length) * 100}%` }]} />
      </View>

      <TouchableOpacity
        style={[styles.button, { opacity: selected !== null && feedback === null ? 1 : 0.5 }]}
        onPress={handleConfirm}
        disabled={selected === null || feedback !== null}
      >
        <Text style={styles.buttonText}>CONFIRMAR RESPOSTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBeige,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    backgroundColor: Colors.blueDark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  headerTitle: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  subHeader: {
    backgroundColor: Colors.softRed,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizTitle: {
    color: Colors.white,
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  timerCircle: {
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: Colors.black,
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
  },
  pointsBox: {
    backgroundColor: Colors.softRed,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  pointsText: {
    color: Colors.white,
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  questionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  questionText: {
    fontFamily: Fonts.primary,
    fontSize: 15,
    marginBottom: 20,
  },
  option: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  optionText: {
    fontFamily: Fonts.primary,
    fontSize: 14,
  },
  optionTextSelected: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.gray,
    borderRadius: 4,
    marginVertical: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.blue,
    borderRadius: 4,
  },
  button: {
    backgroundColor: Colors.blueDark,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
  },
});
