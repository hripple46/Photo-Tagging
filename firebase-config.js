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
    }
  }
}

export { showDocs, compareUserSelect };
