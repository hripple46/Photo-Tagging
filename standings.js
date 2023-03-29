import { addScoreToFirestore } from "./firebase-config.js";

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
    console.log(timeTaken);

    let name = document.querySelector("#nameInput").value; //get the name of the user
    addScoreToFirestore(name, timeTaken); //add the name and time taken to the firestore database
  });
}

export { showPrompt, addStandings };
