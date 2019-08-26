var card = $("#quiz");

// questions
var questions = [
  {
    question: "Whale Rider",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Sparklehorse",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Ooze Mephit",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Shambling Mound",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Imagine Dragons",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "The Spirit of the Beehive",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Black Pudding",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  },
  {
    question: "Brain in a Jar",
    answers: ["Indie Band", "Foreign Film", "D&D Monster"],
    correctAnswer: ""
  }
];
// declaring the value for the timer to 60 seconds
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function () {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME'S UP");
      game.done();
    }
  },

  start: function () {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questons[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name=question-" + i + "'value='" + questons[i].answer[j] + "''>" + question[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function () {
    var inputs = card.children("input: checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function () {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>All Done!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

//calling functions
$(document).on("click", "#start", function () {
  game.start();
});
$(document).on("click", "#done", function () {
  game.done();
});

