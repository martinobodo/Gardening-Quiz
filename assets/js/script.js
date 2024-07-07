/* jshint esversion: 6 */

// Get the form and input elements for username submission
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const usernameForm = document.getElementById('username-form');
const quizContainer = document.getElementById('quiz-container');

// Get the elements for the quiz questions and answers
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer'); //Timer 

let currentQuestionIndex = 0; // Current question index
let score = 0; // Player's score
let username = ''; // Player's username
let countdown; // Variable to hold countdown interval

// Array of questions with their answers and correct answer indication
const questions = [
    {
        question: "The Spade is used for what gardening task?",
        answers: [
            { text: "Digging", correct: true },
            { text: "Strimming", correct: false },
            { text: "Hedgecutting", correct: false },
            { text: "Jetwashing", correct: false },
        ]
    },
    {
        question: "The Strimmer is used for what gardening task?",
        answers: [
            { text: "Digging", correct: false },
            { text: "Hedgecutting", correct: false },
            { text: "Lawn edging", correct: true },
            { text: "Jetwashing", correct: false },
        ]
    },
    {
        question: "The Jetwash is used for what gardening task?",
        answers: [
            { text: "Jetwashing", correct: true },
            { text: "Hedgecutting", correct: false },
            { text: "Lawn edging", correct: false },
            { text: "Digging", correct: false },
        ]
    },
    {
        question: "When it is time to prune roses, what height of the bush should be cut?",
        answers: [
            { text: "Half", correct: false },
            { text: "90%", correct: false },
            { text: "One Third", correct: true },
            { text: "10%", correct: false },
        ]
    },
    {
        question: "What is the most efficient way to remove weeds from a large commercial site?",
        answers: [
            { text: "Chemical Weedkiller", correct: true },
            { text: "Patio Brush", correct: false },
            { text: "Strimmer", correct: false },
            { text: "Hand Pulling", correct: false },
        ]
    },
    {
        question: "What is the most efficient way to remove debris from the garden after a tidy?",
        answers: [
            { text: "Clearing by hand", correct: false },
            { text: "Leave Rake", correct: false },
            { text: "Sweeping Brush", correct: false },
            { text: "Blower", correct: true },
        ]
    },
    {
        question: "Can you name the latin name for the grape vine?",
        answers: [
            { text: "Vivarium", correct: false },
            { text: "Vitus", correct: true },
            { text: "Vase", correct: false },
            { text: "Veruca", correct: false },
        ]
    },
    {
        question: "Which plant grows in ponds with poor oxygenation",
        answers: [
            { text: "Roses", correct: false },
            { text: "Algae", correct: true },
            { text: "Blueberrys", correct: false },
            { text: "Blackberrys", correct: false },
        ]
    },
    {
        question: "Sthil is?",
        answers: [
            { text: "Type of netting", correct: false },
            { text: "Hand Pruners", correct: false },
            { text: "Tool Manufactureur", correct: true },
            { text: "Type of allotment", correct: false },
        ]
    },
    {
        question: "What colour are Eucalyptus leaves?",
        answers: [
            { text: "Blue-Green", correct: true },
            { text: "Red", correct: false },
            { text: "Yellow", correct: false },
            { text: "Black", correct: false },
        ]
    }
];

// Event listener for form submission to start the quiz
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    username = usernameInput.value; // Get the username
    if (username) { // If username is provided
        usernameForm.style.display = 'none'; // Hide the username form
        quizContainer.style.display = 'block'; // Show the quiz container
        startQuiz(); // Start the quiz
    }
});

// Function to shuffle the questions array
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
    shuffleQuestions(questions); // Shuffle the questions
    nextButton.innerHTML = "Next"; // Set the button text
    showQuestion(); // Show the first question
}

// Create function to display a question
function showQuestion() {
    resetState(); // Reset the quiz state
    startCountdown();// Start a timer
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question
    let questionNo = currentQuestionIndex + 1; // Calculate the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Mark correct answer
        }
        button.addEventListener("click", selectAnswer); // Add event listener to the button
    });
}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) { // Remove all previous answer buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
    stopCountdown(); // Stop timer
}

// Create the Function to select the answer
function selectAnswer(e) {
    const selectedBtn = e.target; // Get the selected button
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Add correct class
        score++; // Increment the score
    } else {
        selectedBtn.classList.add("incorrect"); // Add incorrect class
    }

    // Mark all correct answers
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons
    });
    nextButton.style.display = "block"; // Show the next button
    stopCountdown(); // Countdown will stop if you click any answer
}

// Function to display the score
function showScore() {
    resetState(); // Reset the state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}, ${username}!`; // Show the score
    nextButton.innerHTML = "Play Again"; // Change button text to "Play Again"
    nextButton.style.display = "block"; // Show the button
}
// Function to handle the next button click
function handleNextButton() {
    currentQuestionIndex++; // Increment the question index
    if (currentQuestionIndex < questions.length) { // If there are more questions
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the score
    }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") { // If button text is "Play Again"
        resetQuiz(); // Reset the quiz
    } else if (currentQuestionIndex < questions.length) { // If there are more questions
        handleNextButton(); // Handle next button click
    } else {
        startQuiz(); // Start the quiz
    }
});

// Function to reset the quiz
function resetQuiz() {
    username = ''; // Clear the username
    usernameInput.value = ''; // Clear the input field
    usernameForm.style.display = 'block'; // Show the username form
    quizContainer.style.display = 'none'; // Hide the quiz container
}

// Function for countdown timer
function startCountdown() {
    let timeLeft = 15;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
                if (timeLeft <= 0) {
            clearInterval(countdown);
            handleNextButton();// Move to next question if time run out, automatically
        }
    }, 1000);
}

// Function to stop countdown
function stopCountdown () {
    clearInterval(countdown);
    timerElement.innerHTML = '';
}

// Event listener for DOM content loaded to start the quiz
document.addEventListener("DOMContentLoaded", startQuiz);
