import { addScoreToFirestore, showStandings } from "./firebase-config.js";

let userPrompt = document.querySelector(".userPrompt"); //display user prompt upon completion of game
function showPrompt(counter) {
  if (counter == 4) {
    userPrompt.style.display = "flex"; //if user has found all animals, display the prompt
    stopTimer(); //stop the timer
    let congrats = document.querySelector("#congrats"); //display the time taken to find all animals
    let timeTaken = document.querySelector(".timer").innerHTML;
    congrats.innerHTML = "CONGRATULATIONS! " + timeTaken + " SECONDS";
  }
}

let time = 0; //variable to store the time
function timer() {
  time++;
  document.querySelector(".timer").innerHTML = time;
}
let myInterval; //variable to store the interval

let startButton = document.querySelector("#start");
startButton.addEventListener("click", () => {
  myInterval = setInterval(timer, 1000);
  let startParent = document.querySelector(".start");
  startParent.style.display = "none";
});

function stopTimer() {
  console.log("Stopping timer...");
  clearInterval(myInterval);
  console.log("timer stopped");
}

userPrompt.addEventListener("submit", (e) => {
  console.log(e.target);
  e.preventDefault();
  debugger;
  //add standings to the firestore database
  let completedTime = document.querySelector("#congrats").innerHTML; //get the time taken to complete the game
  let timeTaken = completedTime.match(/\d+/g).map(Number); //extract the time taken to complete the game
  let userTime = timeTaken[0];

  let name = document.querySelector("#nameInput").value; //get the name of the user
  let scoreList = document.querySelector(".leaderboard");
  let leaderboardContainer = document.querySelector(".leaderboardContainer");
  leaderboardContainer.style.display = "flex";
  scoreList.style.display = "flex";
  addScoreToFirestore(name, userTime); //add the name and time taken to the firestore database
});

function getTopThree(standings) {
  //using bubble sort to sort the standings
  for (let i = 0; i < standings.length; i++) {
    for (let j = 0; j < standings.length - 1; j++) {
      if (standings[j].Time > standings[j + 1].Time) {
        let temp = standings[j];
        standings[j] = standings[j + 1];
        standings[j + 1] = temp;
      }
    }
  }
  console.log(standings);
  showTopThree(standings);
}
function showTopThree(standings) {
  for (let i = 0; i < 10; i++) {
    console.log(standings[i]);
    let leaderboard = document.querySelector("#leaderboardList");
    let score = document.createElement("li");
    score.innerHTML = `${standings[i].Name} - ${standings[i].Time} seconds`;
    leaderboard.appendChild(score);
  }
  let restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart";
  restartButton.setAttribute("id", "restart");
  let leaderboardContainer = document.querySelector(".leaderboardContainer");
  leaderboardContainer.appendChild(restartButton);
  restartButton.addEventListener("click", () => {
    location.reload();
  });
}

export { showPrompt, getTopThree };
