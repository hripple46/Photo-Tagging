import { showPrompt, getTopThree } from "./standings.js";

// Your Firebase configuration and initialization code
const firebaseConfig = {
  apiKey: "AIzaSyCz1qfjU-_XZAgdS4oXfcuPV6NaWoancis",
  authDomain: "photo-tagging-6ab04.firebaseapp.com",
  projectId: "photo-tagging-6ab04",
  storageBucket: "photo-tagging-6ab04.appspot.com",
  messagingSenderId: "8769362379",
  appId: "1:8769362379:web:21bad7a1cd050930ecbe4e",
  measurementId: "G-KGRHFDDS1W",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

let app = initializeApp(firebaseConfig); // Initialize Firebase
let db = getFirestore(app); // Get a Firestore instance
async function showDocs() {
  //function to show the documents in the Animals collection
  let querySnapshot = await getDocs(collection(db, "Animals"));
  querySnapshot.forEach((doc) => {
    let docData = doc.data();
  });
}
let Counter = 0; //variable to count the number of times the user has clicked correctly

async function compareUserSelect(animal, x, y) {
  //function to compare the user's selection with the coordinates of the animals
  let querySnapshot = doc(db, "Animals", animal);
  let docSnap = await getDoc(querySnapshot);
  let dataObject = docSnap.data();
  console.log(
    dataObject.name + ":" + dataObject.xPosition,
    dataObject.yPosition
  );
  console.log("User Selected: " + x, y);
  if (dataObject.xPosition - 5 < x && x < dataObject.xPosition + 5) {
    if (dataObject.yPosition - 5 < y && y < dataObject.yPosition + 5) {
      console.log("You found the animal!");
      showX(dataObject.xPosition, dataObject.yPosition);
      Counter++; //increment the counter
      showPrompt(Counter); //call the function to show the prompt
      console.log(Counter);
    }
  }
}

function showX(x, y) {
  //function to show the X on the page
  let X = document.createElement("img");
  X.src = "./assets/images/close.png";
  X.style.position = "absolute";
  X.style.top = y + "%";
  X.style.left = x + "%";
  X.style.height = "50px";
  X.style.width = "auto";
  X.style.transform = "translate(-50%, -50%)"; //this is to center the image
  document.body.appendChild(X);
}

async function addScoreToFirestore(name, timeTaken) {
  let UserScores = await collection(db, "Standings"); //get the collection from the firestore database
  console.log(UserScores);

  let newScore = { Name: name, Time: timeTaken };
  await addDoc(UserScores, newScore);
  location.reload(); //reload the page
}
//this function pulls standings from Firestore and displays them on page
async function showStandings() {
  let topThree = [];
  let standings = await getDocs(collection(db, "Standings"));
  standings.forEach((doc) => {
    let data = doc.data();
    console.log(data);
    topThree.push({ Name: data.Name, Time: data.Time });
  });
  console.log(topThree);
  getTopThree(topThree);
}

export { showDocs, compareUserSelect, addScoreToFirestore, showStandings };
