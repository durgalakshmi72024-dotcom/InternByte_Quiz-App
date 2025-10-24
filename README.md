# DSA Quiz App 🎯

A beautiful, animated DSA (Data Structures & Algorithms) quiz application with stunning visual effects and smooth user experience.

## Features ✨

- **DSA Problem-Solving Questions**: 10 challenging questions on Data Structures & Algorithms
- **Compact Design**: Optimized size with smooth scrolling for better viewing experience
- **Animated Welcome Screen**: Eye-catching title with bouncing letters
- **Floating Bubble Background**: Smooth animated bubbles floating in the background
- **Progress Bar**: Visual progress indicator throughout the quiz
- **Score Tracking**: Real-time score updates
- **Answer Feedback**: Instant visual feedback with animations for correct/incorrect answers
- **Animated Transitions**: Smooth transitions between questions and screens
- **Results Screen**: Beautiful circular progress indicator showing your final score
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds, glassmorphism effects, custom scrollbar, and hover animations

## How to Use 🚀

1. Open `index.html` in any modern web browser
2. Click "Start Quiz" on the welcome screen
3. Read each question and click on your answer
4. Get instant feedback on whether your answer was correct
5. Click "Next Question" to proceed
6. View your final score with a beautiful animation
7. Click "Play Again" to restart the quiz

## Technologies Used 💻

- **HTML5**: Structure and layout
- **CSS3**: Animations, gradients, and responsive design
- **JavaScript**: Quiz logic and interactivity

## Customization 🎨

### Adding Your Own Questions

Edit the `quizData` array in `script.js`:

```javascript
const quizData = [
    {
        question: "Your question here?",
        answers: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0 // Index of correct answer (0-3)
    },
    // Add more questions...
];
```

### Changing Colors

Modify the gradient colors in `style.css`:
- Main gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Button gradient: `linear-gradient(135deg, #667eea, #764ba2)`

### Adjusting Animations

All animations are defined in `style.css` and can be customized:
- `bounce`: Letter animation on welcome screen
- `float`: Bubble floating animation
- `slideIn`: Screen transition animation
- `correctAnswer`: Correct answer animation
- `shake`: Incorrect answer animation

## Browser Compatibility 🌐

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## File Structure 📁

```
Quiz/
│
├── index.html      # Main HTML structure
├── style.css       # All styles and animations
├── script.js       # Quiz logic and functionality
└── README.md       # This file
```

## Animation Features 🎬

1. **Bouncing Letters**: The title letters bounce with staggered delays
2. **Floating Bubbles**: Background bubbles float continuously
3. **Slide-in Questions**: Questions appear with smooth slide animation
4. **Answer Hover Effects**: Buttons glow and slide on hover
5. **Correct/Incorrect Feedback**: Bounce and shake animations
6. **Score Ring Animation**: Circular progress bar fills smoothly
7. **Button Glow**: Shimmering effect on button hover

Enjoy your quiz! 🎉

