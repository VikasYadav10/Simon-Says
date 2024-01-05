let gameSeq = [];
let userSeq = [];
let score = [];

let gameStart = false;
let level = 0;

let colors = ["yellow", "green", "red", "purple"];
let lvl = document.querySelector("h2");

let displayHighScore = document.querySelector(".highScore");

document.addEventListener("keypress", function () {
  if (gameStart === false) {
    console.log("game started");
    gameStart = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function checkSeq(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    lvl.innerHTML = `Game over.Your score is ${level}.<br/> Press any key to start again.`;
    score.push(level);
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function levelUp() {
  userSeq = [];
  level++;
  lvl.innerHTML = `Level ${level}`;
  let randNum = Math.floor(Math.random() * 3);
  let randColor = colors[randNum];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let id = btn.getAttribute("id");
  userSeq.push(id);
  checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (btns of allBtns) {
  btns.addEventListener("click", btnPress);
}

function reset() {
  gameSeq = [];
  gameStart = false;
  level = 0;
  displayHighScore.innerText = `High Score is: ${highScore(score)}`;
}

function highScore(score) {
  let hScore = 0;
  for (let i = 0; i < score.length; i++) {
    if (score[i] > hScore) {
      hScore = score[i];
    }
  }
  return hScore;
}
