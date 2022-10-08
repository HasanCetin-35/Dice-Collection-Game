const dice = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
dice.classList.add("hidden"); //css bölümüne hidden parametresini ekliyoruz.
//sonra display: none yapıp görünmez kılıyoruz ve bu görünmezliği dice classına ekliyoruz.
//böylelikle sayfayı yenilediğimizde zar gözükmüyor.
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let activePlayer = 0;
let currentScore = 0;
let play = true;
let score = [0, 0];
score0.textContent = 0;
score1.textContent = 0;
const init = function () {
  play = true;
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  player0.classList.add("player--active"); //eğer player--active varsa kaldırıcak yok ise ekleyecektir.
  player1.classList.remove("player--active");
  dice.classList.remove("hidden");
  for (let i = 0; i < 2; i++) {
    document.querySelector(`.player--${i}`).classList.remove("player--winner");
    document.getElementById(`score--${i}`).textContent = 0;
    document.getElementById(`current--${i}`).textContent = currentScore;
  }
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active"); //eğer player--active varsa kaldırıcak yok ise ekleyecektir.
  player1.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (play) {
    const diceRandom = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice${diceRandom}.png`;

    if (1 !== diceRandom) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (play) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      play = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", init);
