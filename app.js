//import firebase functions
import { showDocs, compareUserSelect } from "./firebase-config.js";
showDocs(); //calling the function to show the documents in the Animals collection

let characterList = document.querySelectorAll(".animal"); //selecting the characters
characterList.forEach((element) => {
  element.addEventListener("click", (e) => {
    let animal = e.target.innerText;
    compareUserSelect(animal, xPercentage, yPercentage);
  });
});

let absoluteX = 0; //variables to store the coordinates of the user
let absoluteY = 0; //variables to store the coordinates of the user

let xPercentage = 0; //variables to store the coordinates of the user as percentages in relation to the image
let yPercentage = 0; //variables to store the coordinates of the user as percentages in relation to the image
//function to check where user is clicking on the page
let coordinates = { xCoordinate: 0, yCoordinate: 0 };
//function to get the coordinates of the user
let getUsersCoordinates = (e) => {
  let x = e.clientX;
  absoluteX = x;

  let y = e.clientY;
  absoluteY = y;
  coordinates.xCoordinate = x;
  coordinates.yCoordinate = y;
  console.log(coordinates);
};

let animalList = document.querySelector(".animal-list"); //selecting the pop up box
animalList.style.display = "none"; //hiding the pop up box

let togglePopUpBox = (e) => {
  //function to toggle the pop up box
  if (animalList.style.display == "none") {
    // if pop-up box is not displayed, show it
    getUsersCoordinates(e); //calling the function to get the coordinates of the user
    getCoordinatesAsPercentages(e); //calling the function to get the coordinates of the user as percentages
    animalList.style.display = "block";
    animalList.style.top = `${coordinates.yCoordinate}px`;
    animalList.style.left = `${coordinates.xCoordinate}px`;
  }
  //check if event.target is neither ul or li then hide the pop up box
  else {
    animalList.style.display = "none";
  }
};
document.addEventListener("click", togglePopUpBox);

//this function is to get the coordinates of the user as percentages in relation to the image
//this allows the resulting coordinates to be compared to the coordinates of the animals
let getCoordinatesAsPercentages = (e) => {
  let image = document.querySelector("img");
  let imageWidth = image.clientWidth;
  let imageHeight = image.clientHeight;
  let x = e.clientX - image.offsetLeft;
  let y = e.clientY - image.offsetTop;
  xPercentage = (x / imageWidth) * 100;
  yPercentage = (y / imageHeight) * 100;
  console.log({
    xCoordinatePercentage: xPercentage,
    yCoordinatePercentage: yPercentage,
  });
};
