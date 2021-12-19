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
    },
    {
        q: "What kind of vehicle does Dennis drive?",
        options: ["Toyota Prius", "Range Rover", "BMW 3-series", "Dodge Challenger"],
        correct: "Range Rover"
    },
    {
        q: "What movie franchise does the gang remake?",
        options: ["Jaws", "Lethal Weapon", "Thunder Gun Express", "Die Hard"],
        correct: "Lethal Weapon"
    },
    {
        q: "How does Mac's cousin, Country Mac, die?",
        options: ["Falling off his motorcycle", "Jumping off a bridge", "Drunken bar fight", "Eaten by a whale"],
        correct: "Falling off his motorcycle"
    },
    {
        q: "Who is Charlie in love with?",
        options: ["Dee", "Artemis", "Gale the Snail", "The Waitress"],
        correct: "The Waitress"
    },
    {
        q: "What is Charlie's uncle's profession?",
        options: ["Lawyer", "Doctor", "Teacher", "Police Officer"],
        correct: "Lawyer"
    },
    {
        q: "What kind of business do the gang own?",
        options: ["Thrift store", "Bowling Alley", "Pawn Shop", "Bar"],
        correct: "Bar"
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
}

function showScores() {
    var scoresList = ""
    var currentScores = JSON.parse(localStorage.getItem("scores"));
    currentScores.sort((a, b) => b.score - a.score);
    console.log("Sorted scores: " + JSON.stringify(currentScores));
    for (var i = 0; i < currentScores.length; i++) {
        scoresList += `<p>${i+1}. ${currentScores[i].initials} : ${currentScores[i].score}</p>`
    }
    highScoresTable.innerHTML = scoresList
}

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

    var answerCheck = document.querySelector("#answerCheck")
    answerCheck.innerHTML = "";
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
    window.location.href = "highscores.html"
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
    var answerCheck = document.querySelector("#answerCheck")
    answerCheck.innerHTML = "";

    console.log("user selected " + this.value);
    if (this.value === questions[currentQ].correct) {
        answerCheck.appendChild(separatorBar);
        console.log(quizArea);
        feedback.textContent = "☘️🍺🥳😃🥳🍺☘️Correct!☘️🍺🥳😃🥳🍺☘️";
        separatorBar.appendChild(feedback);
    } else {
        console.log(quizArea);
        answerCheck.appendChild(separatorBar);
        feedback.textContent = "☘️🍺🤢🤮🤢🍺☘️Incorrect!☘️🍺🤢🤮🤢🍺☘️";
        separatorBar.appendChild(feedback);
        if (secondsLeft < 10) {
            secondsLeft = 1;
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