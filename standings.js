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
let myInterval = setInterval(timer, 1000);

function stopTimer() {
  console.log("Stopping timer...");
  clearInterval(myInterval);
  console.log("timer stopped");
}
function addStandings() {
  userPrompt.addEventListener("submit", (e) => {
    e.preventDefault();
    //add standings to the firestore database
    let completedTime = document.querySelector("#congrats").innerHTML; //get the time taken to complete the game
    let timeTaken = completedTime.match(/\d+/g).map(Number); //extract the time taken to complete the game
    let userTime = timeTaken[0];

    let name = document.querySelector("#nameInput").value; //get the name of the user
    addScoreToFirestore(name, userTime); //add the name and time taken to the firestore database
  });
}

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
  for (let i = 0; i < 3; i++) {
    console.log(standings[i]);
    let leaderboard = document.querySelector("#leaderboardList");
    let score = document.createElement("li");
    score.innerHTML = `${standings[i].Name} - ${standings[i].Time} seconds`;
    leaderboard.appendChild(score);
  }
}

export { showPrompt, addStandings, getTopThree };
