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

var startButton = document.querySelector("#startButton");
var timeEl = document.querySelector("#time");
var quizArea = document.querySelector("#quizArea")
var secondsLeft = 5;
var currentQ = -1;

startButton.addEventListener("click", startGame);

function startGame() {
    setTime();
    console.log("starting quiz",{
        currentQ
    });
    displayQuestion(currentQ);
}
function endGame() {
    console.log("game over");
} // end endGame function definition
function displayQuestion(qNumber) {
    var questionBody = "this is the question body";
    quizArea.innerHTML = "";
    qNumber++

    console.log("display question\n" + JSON.stringify(questions[qNumber]));
    console.log("questions\n" + questions[qNumber].q);
    questionBody = "<h2>" + questions[qNumber].q + "</h2>";
    

    for (var i = 0; i < questions[qNumber].options.length; i++) {
        console.log(i + ". " + questions[qNumber].options[i]);
        questionBody += "<button><p>" + (i + 1) + ". " + questions[qNumber].options[i] + "</p></button> <br>";
    }

    quizArea.innerHTML = questionBody;
} // end displayQuestion function definition


function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
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