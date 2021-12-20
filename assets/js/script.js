var questions = [
    {
        q: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },
    {
        q: "The condition in an if/else statement is enclosed within ________.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        q: "Arrays in JavaScript can be used to store ________.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        q: "String values must be enclosed within ________ when being assigned to variables",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "quotes"
    },
    {
        q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console log"],
        correct: "console log"
    },
    {
        q: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<javascript>", "<scripting>", "<js>"],
        correct: "<script>"
    },
    {
        q: "How do you declare a JavaScript variable?",
        options: ["var userName", "variable userName", "v userName", "variable = userName"],
        correct: "var userName"
    },
    {
        q: "How do you write 'Hello World' in an alert box?",
        options: ["alertBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');"],
        correct: "alert('Hello World');"
    },
    {
        q: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function:myFunction()", "function{myFunction()}", "function myFunction()"],
        correct: "function myFunction()"
    },
    {
        q: "How do you call a function named 'myFunction'?",
        options: ["call function myFunction()", "call myFunction()", "myFunction()", "function myFunction()"],
        correct: "myFunction()"
    }
] // array of questions, answer choices, correct answers

if (localStorage.getItem("scores") === null) {
    localStorage.setItem("scores", "[]");
} 

var startButton = document.querySelector("#startButton");
var timeEl = document.querySelector("#time");
var quizArea = document.querySelector("#quizArea")
var secondsLeft = 75;
var currentQ = -1;
var timerInterval;
var highScoresTable = document.querySelector("#highScoresTable");
var clearScoresBtn = document.querySelector("#clearScoresBtn");

if (startButton) {
    startButton.addEventListener("click", startGame);
}
if (highScoresTable) {
    showScores();
}
if (clearScoresBtn) {
    clearScoresBtn.addEventListener("click", clearScores);
}

function clearScores() {
    localStorage.setItem("scores", "[]");
    window.location.href = "index.html"
} // end clearScores function definition

function showScores() {
    var scoresList = ""
    var currentScores = JSON.parse(localStorage.getItem("scores"));
    currentScores.sort((a, b) => b.score - a.score);
    for (var i = 0; i < currentScores.length; i++) {
        scoresList += `<p>${i+1}. ${currentScores[i].initials} : ${currentScores[i].score}</p>` //template literals, string interpolation, variable substitutions
    }
    highScoresTable.innerHTML = scoresList
} // end showScores function definition

function startGame() {
    setTime();
    displayQuestion();
} //end startGame function definition

function endGame() {
    clearInterval(timerInterval);
    timeEl.textContent = "Time: " + secondsLeft;
    quizArea.innerHTML = "";

    var endGameHeader = document.createElement("h2");
    endGameHeader.textContent = "All done!";
    quizArea.appendChild(endGameHeader);

    var endGameScore = document.createElement("p");
    endGameScore.textContent = "Your final score is " + secondsLeft;
    quizArea.appendChild(endGameScore);

    var endGameForm = document.createElement("input");
    endGameForm.setAttribute("type", "text");
    endGameForm.setAttribute("id", "initials");
    quizArea.appendChild(endGameForm);


    var endGameSubBtn = document.createElement("button");
    endGameSubBtn.addEventListener("click", saveScore);
    endGameSubBtn.textContent = "Submit";
    quizArea.appendChild(endGameSubBtn);

    var answerCheck = document.querySelector("#answerCheck")
    answerCheck.innerHTML = "";
} // end endGame function definition

function saveScore() {
    var prevScores = JSON.parse(localStorage.getItem("scores"));
    var scoreToSave = {
        initials: "", score: ""
    }
    var userInitials = document.querySelector("#initials").value;
    scoreToSave.initials = userInitials;
    scoreToSave.score = parseInt(secondsLeft);
    prevScores.push(scoreToSave);
    var newScores = JSON.stringify(prevScores)
    localStorage.setItem("scores", newScores);
    window.location.href = "highscores.html"
} //end saveScore function definition

function displayQuestion() {
    quizArea.innerHTML = "";
    currentQ++;
    if (currentQ === questions.length) {
        return endGame();
    }

    var questionTitle = document.createElement("h2");
    questionTitle.textContent = questions[currentQ].q;
    quizArea.appendChild(questionTitle);

    for (var i = 0; i < questions[currentQ].options.length; i++) {
        var buttonText = document.createElement("p");
        buttonText.textContent = (i + 1) + ". " + questions[currentQ].options[i];
        var buttonInput = document.createElement("button");
        buttonInput.setAttribute("class", "optionButton")
        buttonInput.setAttribute("value", questions[currentQ].options[i])

        buttonInput.appendChild(buttonText)
        buttonInput.onclick = handleUserAnswer;
        quizArea.appendChild(buttonInput);
    }
} // end displayQuestion function definition

function handleUserAnswer() {
    var separatorBar = document.createElement("hr")
    var feedback = document.createElement("p")
    var answerCheck = document.querySelector("#answerCheck")
    answerCheck.innerHTML = "";

    if (this.value === questions[currentQ].correct) {
        answerCheck.appendChild(separatorBar);
        feedback.textContent = "✅😃Correct!😃✅";
        separatorBar.appendChild(feedback);
    } else {
        answerCheck.appendChild(separatorBar);
        feedback.textContent = "❌😧Incorrect!😧❌";
        separatorBar.appendChild(feedback);
        if (secondsLeft < 10) {
            secondsLeft = 1;
        } else {
            secondsLeft -= 10;
        }
    }
    displayQuestion();
} // end handleUserAnswer function definition

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0) {
            endGame();
        }
    }, 1000);
}  //end setTime function definition

// Click on Start button
    // Start the timer
    // Display the first question with options 
        // check if index < questions.length
        // create a function with index as an argument
        // function showQuestion(currentQ) {
        // }
    // Each option is a button with click event on it // maybe use event.target with matches function

// Stop the timer
    // if timer = 0;
    // if user completes the quiz

// Find out if user clicked option is correct or not
    // if correct: display message (for certain time period)
    // if wrong: display message (for certain time period) and change the timer accordingly
    // calculate the score (but don't display)
// index++
// Display the next question

// Once user finished with last question
    // stop timer
    // ask for user initials in a form > take that info and display it with score
    // save initials and score in local storage
    // a href will refer to second html file (highscores.html)