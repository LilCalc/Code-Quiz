//Define Variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;
//Begin the quiz
function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
  }
  //Grab questions to use
  function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.textContent = i + 1 + ". " + choice;
      choiceNode.onclick = questionClick;
      choicesEl.appendChild(choiceNode);
    });
  }
  //Was the user correct?
  function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = "Uh-Oh!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "400%";
    } else {
      feedbackEl.textContent = "Good Answer!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "400%";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  //End the quiz
  function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
  }
  //if time runs out, end the quiz
  function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
  }
  //save in local storage
  function saveHighscore() {
    var initials = initialsEl.value.trim();
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        initials: initials
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href="./Hscore.html"
    }
  }
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  //BUTTONS!
  submitBtn.onclick = saveHighscore;
  startBtn.onclick = startQuiz;
  initialsEl.onkeyup = checkForEnter;