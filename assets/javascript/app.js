$(document).ready(function () {

    // VARIABLES //

    var questionCounter = 0;

    var answerTimeout = 3000;

    var correct = 0;

    var incorrect = 0;

    var userAnswer = [];

    var questions = [
      {
        question: "Whale Rider",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 1
      },
      {
        question: "Sparklehorse",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 0
      },
      {
        question: "Ooze Mephit",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 2
      },
      {
        question: "Imagine Dragons",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 0
      },
      {
        question: "The Spirit of the Beehive",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 1
      },
      {
        question: "Dogtooth",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 1
      },
      {
        question: "Lizardfolk",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 2
      },
      {
        question: "Babybird",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 0
      },
      {
        question: "Shambling Mound",
        choices: ["Indie Band", "Foreign Film", "D&D Monster"],
        choicesAnswer: 2
      }];

    // FUNCTIONS //

    // Display start page
    function displayStart() {
      $("#content").append("<button class='btn btn-warning btn-lg' id='start-button'>" + "Start" + "</button>");
      // Button starts the game
      $("#start-button").on("click", function (start) {
        start.preventDefault();
        firstQuestion();
        resetTimer();
        runTimer();
      });
    };

    // Display the first question page
    function firstQuestion() {
      var start = $("#content");
      start.empty();
      displayQuestion();
    };

    // Display the current question page
    function displayQuestion() {
      // clear previous quiz form and timer
      clearQuestion();
      stopTimer();
      resetTimer();
      // display question
      $(".questionX").html(questions[questionCounter].question);
      // call quiz form function
      createRadios();
      // create submit button
      $("#submit-div").append("<button type='submit' class='btn btn-warning' id='submit'>" + "Answer" + '</button');
      runTimer();
      submitAnswer();
    };

    // Submit user answers
    function submitAnswer() {
      $("#submit").on("click", function (submit) {
        submit.preventDefault();
        userAnswer.length = 0;


        // record the answer
        var userSelection = $("#responses input:radio[name=optionRadios]:checked").val();
        userAnswer.push(userSelection);
        console.log(userAnswer);
        nextQuestion();
      });
    };

    // Timer functions
    var timeLeft = 10;
    var increment;

    function runTimer() {
      increment = setInterval(decrement, 1000);
    };

    function decrement() {
      timeLeft--;
      $("#time-left").text("Time remaining: " + timeLeft + " seconds");
      if (timeLeft == 0) {
        stopTimer();
        userAnswer.length = 0;
        // record 
        var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
        userAnswer.push(userSelection);
        console.log(userAnswer);
        nextQuestion();
      };
    };

    // Remove timer for the answer review
    function displayReview() {
      $("#time-left").text("Judges...");
    };

    function resetTimer() {
      clearInterval(increment);
      timeLeft = 10;
      $("#time-left").text("Time remaining: " + timeLeft + " seconds");
    };

    function stopTimer() {
      clearInterval(increment);
      clearTimeout(increment);
    };

    // Change to the next question or end the quiz
    function nextQuestion() {
      // check for correct answer
      checkQuestion();

      questionCounter++;
      // either end the quiz or display next question
      if (questionCounter === questions.length) {
        setTimeout(displayEnd, answerTimeout);
      }

      else {
        setTimeout(displayQuestion, answerTimeout);
      };
    };

    // Check user choice with the correct answer for each question
    function checkQuestion() {
      // clear current quiz form
      clearQuestion();
      stopTimer();

      // find correct answer to current question
      var correctAnswer = questions[questionCounter].choicesAnswer;

      // compare choice with answer
      if (userAnswer[0] == questions[questionCounter].choicesAnswer) {
        $("#content").append("<h2>" + "That's correct!" + "</h2>");
        // add to the correct choice counter
        correct++;
        displayReview();
      }

      else if (userAnswer[0] === undefined) {
        $("#content").append("<h2>" + "Time's up!" + "</h2> <br> <h2>" + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + "</h2>");
        displayReview();
      }

      else {
        $("#content").append("<h2>" + "Oooh. Sorry." + "</h2> <br> <h2>" + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + "</h2>");
        // add to the incorrect choice counter
        incorrect++;
        displayReview();
      };
    };

    // Clear quiz to prep for next part of game
    function clearQuestion() {
      var questionDiv = $(".questionX");
      questionDiv.empty();

      var responseDiv = $("#responses");
      responseDiv.empty();

      var submitDiv = $("#submit-div");
      submitDiv.empty();

      var contentDiv = $("#content");
      contentDiv.empty();

      stopTimer();
    };

    // Display quiz form
    function createRadios() {
      var responseOptions = $("#responses");
      // empty array from previous question
      responseOptions.empty();

      // create multiple choice input
      for (var i = 0; i < questions[questionCounter].choices.length; i++) {
        responseOptions.append("<input type='radio' name='optionRadios' value='" + [i] + "' style='float:left'><div class='options' style='font-weight:bold'>" + '&nbsp &nbsp' + questions[questionCounter].choices[i] + "</div></input>");
      };
    };

    // Reset variables for end of game
    function reset() {
      questionCounter = 0;
      correct = 0;
      incorrect = 0;
      userAnswer = [];
      resetTimer();
    };

    // Display end of game
    function displayEnd() {
      clearQuestion();
      // shows the final score
      $("#content").append("<h2>" + "Correct answers: " + correct + "</h2> <br> <h2>" + "Incorrect answers: " + incorrect + "</h2> <br> <h2> <button class='btn btn-warning btn-lg' id='restart-button'>" + "Play Again" + "</button");

      // restarts game
      $("#restart-button").on("click", function (restart) {
        restart.preventDefault();
        // show first question
        reset();
        clearQuestion();
        displayStart();
      });
    };

    // Starts game on page load
    displayStart();
  });

  