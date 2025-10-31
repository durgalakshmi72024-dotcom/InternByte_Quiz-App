// Java Problem Solving Quiz Questions
const quizQuestions = [
    {
        question: `What will be the output of this Java code?

int x = 5;
int y = ++x + x++;
System.out.println(y);`,
        options: [
            'A) 11',
            'B) 12',
            'C) 13',
            'D) 10'
        ],
        correct: 1, // 12
        explanation: '++x increments x to 6 first, then x++ uses 6 and increments to 7. So y = 6 + 6 = 12'
    },
    {
        question: `What is the output of the following code?

String str1 = "Hello";
String str2 = "Hello";
String str3 = new String("Hello");
System.out.println(str1 == str2);
System.out.println(str1 == str3);`,
        options: [
            'A) true, true',
            'B) true, false',
            'C) false, true',
            'D) false, false'
        ],
        correct: 1, // true, false
        explanation: 'str1 and str2 reference the same string in the pool. str3 creates a new object, so == returns false'
    },
    {
        question: `What will this code print?

int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {
    if (i == 2) continue;
    if (i == 4) break;
    System.out.print(arr[i] + " ");
}`,
        options: [
            'A) 1 2 4',
            'B) 1 2 3 4',
            'C) 1 2 4 5',
            'D) 1 2'
        ],
        correct: 0, // 1 2 4
        explanation: 'Skips index 2 (continue), prints 1, 2, 4, then breaks at index 4'
    },
    {
        question: `What is the result of this operation?

int a = 10;
int b = 20;
int c = a++ + ++b;
System.out.println(a + " " + b + " " + c);`,
        options: [
            'A) 11 21 31',
            'B) 11 21 30',
            'C) 10 21 31',
            'D) 11 20 30'
        ],
        correct: 0, // 11 21 31
        explanation: 'a++ uses 10 then increments to 11. ++b increments to 21 then uses 21. c = 10 + 21 = 31'
    },
    {
        question: `What will be the output?

public static void main(String[] args) {
    int x = 0;
    for (int i = 1; i <= 5; i++) {
        x += i;
    }
    System.out.println(x);
}`,
        options: [
            'A) 10',
            'B) 15',
            'C) 20',
            'D) 25'
        ],
        correct: 1, // 15
        explanation: 'Sum of 1+2+3+4+5 = 15'
    },
    {
        question: `What is the output of this recursive function?

public static int mystery(int n) {
    if (n <= 1) return 1;
    return n * mystery(n - 1);
}
System.out.println(mystery(5));`,
        options: [
            'A) 120',
            'B) 60',
            'C) 24',
            'D) 15'
        ],
        correct: 0, // 120
        explanation: 'This is a factorial function: 5! = 5*4*3*2*1 = 120'
    },
    {
        question: `What will this code print?

int[] nums = {10, 20, 30};
for (int num : nums) {
    num += 5;
}
System.out.println(nums[0]);`,
        options: [
            'A) 10',
            'B) 15',
            'C) 20',
            'D) Compilation Error'
        ],
        correct: 0, // 10
        explanation: 'Enhanced for-loop creates a copy. Original array is not modified'
    },
    {
        question: `What is the output?

String s = "Java";
s.concat(" Programming");
s.toUpperCase();
System.out.println(s);`,
        options: [
            'A) Java',
            'B) Java Programming',
            'C) JAVA PROGRAMMING',
            'D) JAVA'
        ],
        correct: 0, // Java
        explanation: 'Strings are immutable. Methods return new strings but s is not reassigned'
    },
    {
        question: `What will be printed?

int x = 15;
int y = 10;
System.out.println(x > y ? x : y);
System.out.println(x < y ? x : y);`,
        options: [
            'A) 15 10',
            'B) 10 15',
            'C) 15 15',
            'D) 10 10'
        ],
        correct: 2, // 15 15
        explanation: 'First ternary returns max (15), second also returns max since condition is false (15)'
    },
    {
        question: `What is the output of this code?

int sum = 0;
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        sum += i;
    }
}
System.out.println(sum);`,
        options: [
            'A) 20',
            'B) 25',
            'C) 30',
            'D) 45'
        ],
        correct: 0, // 20
        explanation: 'Sum of even numbers 0+2+4+6+8 = 20'
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedAnswer = null;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const progressFill = document.getElementById('progress-fill');
const nextBtn = document.getElementById('next-btn');

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    selectedAnswer = null;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    resetTimer();
    selectedAnswer = null;
    nextBtn.style.display = 'none';
    
    const question = quizQuestions[currentQuestionIndex];
    
    questionText.textContent = question.question;
    questionCounter.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
    scoreDisplay.textContent = score;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Load options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    startTimer();
}

// Select Answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = index;
    clearInterval(timer);
    
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    if (index === question.correct) {
        options[index].classList.add('correct');
        score += 10;
        correctAnswers++;
        scoreDisplay.textContent = score;
        
        // Play success animation
        options[index].style.animation = 'correctAnswer 0.6s ease';
    } else {
        options[index].classList.add('wrong');
        options[question.correct].classList.add('correct');
        wrongAnswers++;
        
        // Play error animation
        options[index].style.animation = 'wrongAnswer 0.6s ease';
    }
    
    nextBtn.style.display = 'block';
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Timer Functions
function startTimer() {
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }
        
        if (timeLeft === 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timerDisplay.classList.remove('warning');
}

function timeOut() {
    if (selectedAnswer !== null) return;
    
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach(opt => opt.classList.add('disabled'));
    options[question.correct].classList.add('correct');
    
    wrongAnswers++;
    nextBtn.style.display = 'block';
}

// Show Results
function showResults() {
    resetTimer();
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const finalScore = document.getElementById('final-score');
    const correctAnswersDisplay = document.getElementById('correct-answers');
    const wrongAnswersDisplay = document.getElementById('wrong-answers');
    const accuracyDisplay = document.getElementById('accuracy');
    const performanceMessage = document.getElementById('performance-message');
    const trophyIcon = document.getElementById('trophy-icon');
    const resultsTitle = document.getElementById('results-title');
    
    finalScore.textContent = `${score}/100`;
    correctAnswersDisplay.textContent = correctAnswers;
    wrongAnswersDisplay.textContent = wrongAnswers;
    
    const accuracy = Math.round((correctAnswers / quizQuestions.length) * 100);
    accuracyDisplay.textContent = `${accuracy}%`;
    
    // Performance message and trophy
    if (score >= 80) {
        performanceMessage.textContent = '🎉 Outstanding! You\'re a Java Master!';
        performanceMessage.className = 'performance-message excellent';
        trophyIcon.textContent = '🏆';
        resultsTitle.textContent = 'Excellent Performance!';
        confetti.start(6000);
    } else if (score >= 60) {
        performanceMessage.textContent = '👏 Great job! Keep practicing!';
        performanceMessage.className = 'performance-message good';
        trophyIcon.textContent = '🥈';
        resultsTitle.textContent = 'Good Work!';
        confetti.start(4000);
    } else if (score >= 40) {
        performanceMessage.textContent = '👍 Not bad! Room for improvement!';
        performanceMessage.className = 'performance-message average';
        trophyIcon.textContent = '🥉';
        resultsTitle.textContent = 'Keep Learning!';
    } else {
        performanceMessage.textContent = '📚 Keep studying! You\'ll do better next time!';
        performanceMessage.className = 'performance-message poor';
        trophyIcon.textContent = '📖';
        resultsTitle.textContent = 'Practice Makes Perfect!';
    }
}

// Restart Quiz
function restartQuiz() {
    confetti.stop();
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}

