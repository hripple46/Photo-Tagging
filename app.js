//function to check where user is clicking on the page
let coordinates = { xCoordinate: 0, yCoordinate: 0 };
//function to get the coordinates of the user
let getUsersCoordinates = (e) => {
  let x = e.clientX;
  let y = e.clientY;
  coordinates.xCoordinate = x;
  coordinates.yCoordinate = y;
  console.log(coordinates);
};

let animalList = document.querySelector(".animal-list"); //selecting the pop up box

let togglePopUpBox = (e) => {
  //function to toggle the pop up box
  if (animalList.style.display == "none") {
    // if pop-up box is not displayed, show it
    getUsersCoordinates(e); //calling the function to get the coordinates of the user
    animalList.style.display = "block";
    animalList.style.top = `${coordinates.yCoordinate}px`;
    animalList.style.left = `${coordinates.xCoordinate}px`;
  }
  //check if event.target is neither ul or li then hide the pop up box
  else if (e.target.tagName !== "UL" && e.target.tagName !== "LI") {
    animalList.style.display = "none";
  }
};
document.body.addEventListener("click", togglePopUpBox);
