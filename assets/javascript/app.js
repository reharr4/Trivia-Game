var card = $("#quiz");

// questions
var questions = [
  {
    question: "Whale Rider",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "Foreign Film"
  },
  {
    question: "Sparklehorse",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "Indie Band"
  },
  {
    question: "Ooze Mephit",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "D&D Monster"
  },
  {
    question: "Shambling Mound",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "D&D Monster"
  },
  {
    question: "Imagine Dragons",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "Indie Band"
  },
  {
    question: "The Spirit of the Beehive",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "Foreign Film"
  },
  {
    question: "Black Pudding",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "D&D Monster"
  },
  {
    question: "Brain in a Jar",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: "D&D Monster"
  }
];
// declaring the value for the timer
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function () {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME'S UP");
      game.timeUp();
    }
  },

  loadQuestion: function () {

    timer = setInterval(game.countdown, 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
    
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
      }
    },

    nextQuestion: function() {
      game.counter = countStartNumber;
      $("#counter-number").text(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },

    timeUp: function () {

      clearInterval(timer);

      $("#counter-number").html(game - counter);
      card.html("<h2>All Done!</h2>");
      card.append("<h3>Correct Answers: " + questons[this.currentQuestion].correctAnswer + "</h3>");

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },

    results: function() {
      clearInterval(timer);
      card.html("<h2>All done!</h2>");

      $("#counter-number").text(game.counter);

      card.append("<h3>Correct Answers: " + game.correct + "</h3>");
      card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
      card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
      card.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function(e) {
      clearInterval(timer);
      if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },

    answeredIncorrectly: function() {
      game.incorrect++;

      clearInterval(timer);

      card.html("<h2>Incorrect</h2>");
      card.append("<h3>The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");

      if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },

    reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };

  //calling functions
  $(document).on("click", "#start-over", function () {
    game.reset();
  });
  $(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
  });
  $(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
  });
