const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', () => {
  startGame();
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

const startGame = () => {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

const setNextQuestion = () => {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

const showQuestion = (question) => {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
};

const resetState = () => {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
};

const setStatusClass = (element, correct) => {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
};

const clearStatusClass = (element) => {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};

const questions = [
  {
    question: 'Who is the founder of Pakistan?',
    answers: [
      { text: 'Quaid-e-Azam Muhammad Ali Jinnah', correct: true },
      { text: 'Sir Syed Ahmed Khan', correct: false },
      { text: 'Dr. Allama Iqbal', correct: false },
      { text: 'Sheikh Mujeeb ur Rehman', correct: false }
    ]
  },
  {
    question: 'When did Pakistan came into being?',
    answers: [
      { text: '10th August, 1947', correct: false },
      { text: '12th August, 1947', correct: false },
      { text: '14th August, 1947', correct: true },
      { text: '15th August, 1947', correct: false }
    ]
  },
  {
    question: 'Is WEB DEVELOPMENT fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'Who is taching you WEB DEVELOPMENT?',
    answers: [
      { text: 'Sir Ramees', correct: false },
      { text: 'Sir Rizwan Jamal', correct: true },
      { text: 'Sir Rehman', correct: false },
      { text: 'Sir Rehan', correct: false }
    ]
  },
  {
    question: 'Do you enjoy WEB DEVELOPMENT?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  }
]