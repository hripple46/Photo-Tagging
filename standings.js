let userPrompt = document.querySelector(".userPrompt"); //display user prompt upon completion of game
function showPrompt(counter) {
  if (counter == 4) userPrompt.style.display = "flex"; //if user has found all animals, display the prompt
}

export { showPrompt };
