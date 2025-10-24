// Quiz Data - DSA Problem Solving Questions
const quizData = [
    {
        question: "What is the time complexity of binary search on a sorted array?",
        answers: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1
    },
    {
        question: "Which data structure uses LIFO (Last In First Out) principle?",
        answers: ["Queue", "Stack", "Linked List", "Array"],
        correct: 1
    },
    {
        question: "What is the worst-case time complexity of Quick Sort?",
        answers: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 2
    },
    {
        question: "In a Binary Search Tree, which traversal gives nodes in sorted order?",
        answers: ["Pre-order", "In-order", "Post-order", "Level-order"],
        correct: 1
    },
    {
        question: "What is the space complexity of recursive Fibonacci without memoization?",
        answers: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1
    },
    {
        question: "Which algorithm is best for finding the shortest path in a weighted graph?",
        answers: ["BFS", "DFS", "Dijkstra's Algorithm", "Quick Sort"],
        correct: 2
    },
    {
        question: "What data structure is typically used to implement a priority queue?",
        answers: ["Array", "Linked List", "Heap", "Stack"],
        correct: 2
    },
    {
        question: "What is the time complexity of accessing an element in a hash table (average case)?",
        answers: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correct: 0
    },
    {
        question: "In dynamic programming, what technique stores results to avoid recomputation?",
        answers: ["Recursion", "Memoization", "Iteration", "Backtracking"],
        correct: 1
    },
    {
        question: "Which sorting algorithm is most efficient for nearly sorted data?",
        answers: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Merge Sort"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Start Quiz
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    showScreen('quiz-screen');
    loadQuestion();
}

// Show Screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Load Question
function loadQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const questionNumberElement = document.getElementById('question-number');
    const progressBar = document.getElementById('progress-bar');
    const nextBtn = document.getElementById('next-btn');
    
    // Update question number and progress
    questionNumberElement.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    
    // Update score display
    document.getElementById('score-display').textContent = `Score: ${score}`;
    
    // Load question
    questionElement.textContent = questionData.question;
    
    // Load answers
    answersElement.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersElement.appendChild(button);
    });
    
    // Hide next button
    nextBtn.style.display = 'none';
    selectedAnswer = null;
}

// Select Answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Already answered
    
    selectedAnswer = index;
    const questionData = quizData[currentQuestion];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);
    
    // Show correct/incorrect
    if (index === questionData.correct) {
        answerButtons[index].classList.add('correct');
        score++;
        // Update score display immediately
        document.getElementById('score-display').textContent = `Score: ${score}`;
    } else {
        answerButtons[index].classList.add('incorrect');
        answerButtons[questionData.correct].classList.add('correct');
    }
    
    // Show next button after delay
    setTimeout(() => {
        document.getElementById('next-btn').style.display = 'inline-block';
    }, 1000);
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    showScreen('results-screen');
    
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessageElement = document.getElementById('result-message');
    const scoreRing = document.getElementById('score-ring');
    
    // Calculate percentage
    const percentage = (score / quizData.length) * 100;
    const circumference = 2 * Math.PI * 54; // radius = 54
    const offset = circumference - (percentage / 100) * circumference;
    
    // Animate score ring
    scoreRing.style.setProperty('--dash-offset', offset);
    
    // Add gradient to SVG
    const svg = document.querySelector('.score-ring');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#667eea;stop-opacity:1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#764ba2;stop-opacity:1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);
    
    // Display score
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
    
    // Display message based on score
    if (percentage === 100) {
        resultMessageElement.textContent = "Perfect! You're a genius! 🌟";
    } else if (percentage >= 80) {
        resultMessageElement.textContent = "Excellent work! You're very knowledgeable! 🎉";
    } else if (percentage >= 60) {
        resultMessageElement.textContent = "Good job! You did well! 👍";
    } else if (percentage >= 40) {
        resultMessageElement.textContent = "Not bad! Keep practicing! 💪";
    } else {
        resultMessageElement.textContent = "Keep learning! You'll do better next time! 📚";
    }
}

// Restart Quiz
function restartQuiz() {
    startQuiz();
}

// Initialize - show welcome screen on load
window.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome-screen');
});

