var questions = [
    {
        q: "",
        options: ["", "", "", ""],
        correct: ""
    },
    {
        q: "",
        options: ["", "", "", ""],
        correct: ""
        }
]

// Click on Start button
    // Start the timer
    // Display the first question with options 
        // check if index < questions.length
        // create a function with index as an argument
    // Each option is a button with click event on it // may be use event.target with matches function

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