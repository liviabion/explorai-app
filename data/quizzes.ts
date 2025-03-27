const quizzes = {
    1: {
      title: 'Sabores da Terra',
      category: 'Saberes Locais',
      totalPoints: 150,
      timePerQuestion: 15,
      questions: [
        {
          question: 'Qual ingrediente é essencial no preparo do E...?',
          options: ['Feijão verde e arroz', 'Farinha de mandioca', 'Carne de sol', 'Jerimum'],
          correct: 2,
        },
        {
          question: 'Qual é uma bebida tradicional nordestina?',
          options: ['Chimarrão', 'Guaraná', 'Cajuína', 'Mate'],
          correct: 2,
        },
      ],
    },
    2: {
      title: 'Rotas dos Engenhos',
      category: 'História Local',
      totalPoints: 100,
      timePerQuestion: 10,
      questions: [
        {
          question: 'Qual produto era mais comum nos engenhos?',
          options: ['Milho', 'Açúcar', 'Algodão', 'Café'],
          correct: 1,
        },
        {
          question: 'Engenhos estão ligados a qual ciclo histórico?',
          options: ['Ciclo da borracha', 'Ciclo do ouro', 'Ciclo do açúcar', 'Ciclo do café'],
          correct: 2,
        },
      ],
    },
  };
  
  export default quizzes;
  