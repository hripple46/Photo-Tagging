let userPrompt = document.querySelector(".userPrompt"); //display user prompt upon completion of game
function showPrompt(counter) {
  if (counter == 4) {
    userPrompt.style.display = "flex";
    stopTimer(); //stop the timer
  } //if user has found all animals, display the prompt
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

export { showPrompt };
