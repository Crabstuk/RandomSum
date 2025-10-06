

// Replace with your Firebase config:
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCehI-syv_3bTO8EfzBfb1ZtuBUYASxgog",
  authDomain: "ni-wiem.firebaseapp.com",
  databaseURL: "https://ni-wiem-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ni-wiem",
  storageBucket: "ni-wiem.firebasestorage.app",
  messagingSenderId: "265558938703",
  appId: "1:265558938703:web:5ff459311d4162a6c6463a",
  measurementId: "G-ZHJ1Y0G80H"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

const switchModeButton = document.getElementById("switchModeButton")
//Account creation section of authorization.
const accountCreationEmailInput = document.getElementById("accountCreationEmailInput")
const accountCreationUsernameInput = document.getElementById("accountCreationUsernameInput");
const accountCreationPasswordInput = document.getElementById("accountCreationPasswordInput");
const confirmAccountCreationButton = document.getElementById("confirmAccountCreationButton");
//Account login section of authorization.
const signInEmailInput = document.getElementById("signInEmailInput")
const signInUsernameInput = document.getElementById("signInUsernameInput")
const signInPasswordInput = document.getElementById("signInPasswordInput")
const signInButton = document.getElementById("signInButton")

let authMode = "login"

const switchModeInAuth = () =>{
  if(authMode && authMode === "login"){
    console.log("i existx ")
    //Hide the account creation section.
    accountCreationEmailInput.style.display = "none"
    accountCreationUsernameInput.style.display = "none"
    accountCreationPasswordInput.style.display = "none"
    confirmAccountCreationButton.style.display = "none"
    //Self-explaniatory.
    switchModeButton.innerText = "I don't have an account."
    //Show the login section
    signInEmailInput.style.display = "block"
    signInUsernameInput.style.display = "block"
    signInPasswordInput.style.display = "block"
    signInButton.style.display = "block"

    authMode = "signUp"
  }else{
    console.log("gugugaga")
    //Show account creation section
    accountCreationEmailInput.style.display = "inline-block"
    accountCreationUsernameInput.style.display = "inline-block"
    accountCreationPasswordInput.style.display = "inline-block"
    confirmAccountCreationButton.style.display = "inline-block"
    //Self-explaniatory #2.
    switchModeButton.innerText = "I already have an account."
    //Hide the login section
    signInEmailInput.style.display = "none"
    signInUsernameInput.style.display = "none"
    signInPasswordInput.style.display = "none"
    signInButton.style.display = "none"

    authMode = "login"
  }
};
//CANVAS!!!
const pongGame = document.getElementById("pongGame");
const ctx = pongGame.getContext("2d");

let BallX = 0;
let BallY = 0;

ctx.fillRect(BallX,BallY,250,250);
const someButton = document.getElementById("someButton");

const goRight = () => {
  let direction = "right";
  setInterval(() => {
      if(BallX >= 0 && BallX < 250 && direction === "right"){
        ctx.clearRect(BallX,BallY,250,250);
        BallX += 50;
        ctx.fillRect(BallX,BallY,250,250);
      }else if(BallX === 0){
        direction = "right"
        ctx.clearRect(BallX,BallY,250,250);
        BallX += 50;
        ctx.fillRect(BallX,BallY,250,250);
      }else{
        ctx.clearRect(BallX,BallY,250,250);
        BallX -= 50;
        ctx.fillRect(BallX,BallY,250,250);
        direction = "left"
    }
  }, 25);
};