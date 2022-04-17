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