const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
      question: "https://i.imgur.com/upu7gMJ.jpg",
      answer1: "Africa",
      answer2: "Antarctica",
      answer3: "Europe",
      answer: 2
    },
    {
      question: "https://i.imgur.com/vWlrNXk.jpg",
      answer1: "Oceania",
      answer2: "North America",
      answer3: "Asia",
      answer: 1
    },
    {
      question: "https://i.imgur.com/EdNkLW8.jpg",
      answer1: "Europe",
      answer2: "Antarctica",
      answer3: "South America",
      answer: 1
    },
    {
      question: "https://i.imgur.com/M17BhGr.jpg",
      answer1: "South America",
      answer2: "Africa",
      answer3: "North America",
      answer: 3
    },
    {
      question: "https://i.imgur.com/G1kpBhT.jpg",
      answer1: "Asia",
      answer2: "Africa",
      answer3: "Oceania",
      answer: 2
    }
];

const correctAnswer = 750;
const maxQuestions = 5;


function startQuiz() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if(availableQuestions.length === 0 || questionCounter >= maxQuestions){
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('../pages/end.html');
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + maxQuestions;

  const questionIndex = Math.floor(Math.random()*availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = "<img src="+currentQuestion.question+">";

  answers.forEach( answer => {
    const number = answer.dataset['number'];
    answer.innerText = currentQuestion['answer' + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

answers.forEach(answer => {
  answer.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedAnswer = e.target;
    const selectedCorrect = selectedAnswer.dataset['number'];

    const classToApply = selectedCorrect == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
      incrementScore(correctAnswer);
    }

    selectedAnswer.parentElement.classList.add(classToApply);
    setTimeout(function () {
      selectedAnswer.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}


startQuiz();
