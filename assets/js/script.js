var questions = [
    {
        q: "Which one of the characters is not in season one?",
        options: ["Dennis", "Sweet Dee", "Mac", "Frank"],
        correct: "Frank"
    },
    {
        q: "Who does Charlie first tell he has cancer?",
        options: ["Dennis", "Sweet Dee", "Mac", "Frank"],
        correct: "Dennis"
    },
    {
        q: "According to Dennis, what does the D in 'D.E.N.N.I.S. System' stand for?",
        options: ["Decline their advances", "Demonstrate your value", "Don't ask for permission", "Defer emotion"],
        correct: "Demonstrate your value"
    },
    {
        q: "What area of law does Charlie claim to specialize in?",
        options: ["Corporate Law", "Criminal Law", "Bird Law", "Maritime Law"],
        correct: "Bird Law"
    }
]

if (localStorage.getItem("scores") === null) {
    localStorage.setItem("scores", "[]");
}

var startButton = document.querySelector("#startButton");
var timeEl = document.querySelector("#time");
var quizArea = document.querySelector("#quizArea")
var secondsLeft = 75;
var currentQ = -1;
var timerInterval;

startButton.addEventListener("click", startGame);

function startGame() {
    setTime();
    console.log("starting quiz", {
        currentQ
    });
    displayQuestion();
}
function endGame() {
    console.log("game over");
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


} // end endGame function definition

function saveScore() {
    var prevScores = JSON.parse(localStorage.getItem("scores"));
    var scoreToSave = {
        initials: "", score: ""
    }
    var userInitials = document.querySelector("#initials").value;
    console.log(userInitials);
    scoreToSave.initials = userInitials;
    scoreToSave.score = parseInt(secondsLeft);
    console.log(scoreToSave);
    prevScores.push(scoreToSave);
    console.log(JSON.stringify(prevScores));
    var newScores = JSON.stringify(prevScores)
    localStorage.setItem("scores", newScores);
    window.location.replace("/highscores.html");
}
function displayQuestion() {
    quizArea.innerHTML = "";
    currentQ++;
    if (currentQ === questions.length) {
        return endGame();
    }

    console.log("display question\n" + JSON.stringify(questions[currentQ]));
    console.log("questions\n" + questions[currentQ].q);
    var questionTitle = document.createElement("h2");
    questionTitle.textContent = questions[currentQ].q;
    quizArea.appendChild(questionTitle);

    for (var i = 0; i < questions[currentQ].options.length; i++) {
        console.log(i + ". " + questions[currentQ].options[i]);
        var buttonText = document.createElement("p");
        buttonText.textContent = (i + 1) + ". " + questions[currentQ].options[i];
        var buttonInput = document.createElement("button");
        buttonInput.setAttribute("class", "optionButton")
        buttonInput.setAttribute("value", questions[currentQ].options[i])

        buttonInput.appendChild(buttonText)
        buttonInput.onclick = handleUserAnswer;
        quizArea.appendChild(buttonInput);
    }
    console.log(document.querySelectorAll(".optionButton"));



} // end displayQuestion function definition

function handleUserAnswer() {
    var separatorBar = document.createElement("hr")
    var feedback = document.createElement("p")

    console.log("user selected " + this.value);
    if (this.value === questions[currentQ].correct) {
        quizArea.appendChild(separatorBar);
        feedback.textContent = "☘️🍺🥳😃🥳🍺☘️Correct!☘️🍺🥳😃🥳🍺☘️";
        separatorBar.appendChild(feedback);
    } else {
        quizArea.appendChild(separatorBar);
        feedback.textContent = "☘️🍺🤢🤮🤢🍺☘️Incorrect!☘️🍺🤢🤮🤢🍺☘️";
        separatorBar.appendChild(feedback);
        if (secondsLeft < 10) {
            endGame();
        } else {
            console.log(secondsLeft);
            secondsLeft -= 10;
        }
    }
    console.log(currentQ);
    displayQuestion();
}

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        console.log(secondsLeft);
        timeEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0) {
            endGame();
        }
    }, 1000);
} // end setTime function definition
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