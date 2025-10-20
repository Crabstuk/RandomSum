

// Replace with your Firebase config:
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE4pJ8Iv77_voL9YM24kcHFzKghYwIDuY",
  authDomain: "idksomething-ced82.firebaseapp.com",
  databaseURL:"https://idksomething-ced82-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "idksomething-ced82",
  storageBucket: "idksomething-ced82.firebasestorage.app",
  messagingSenderId: "557355216917",
  appId: "1:557355216917:web:833a07e136dfca72769e1c"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();


const signOutUserButton = document.getElementById("signOutUserButton")

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

const createUser = () =>{
  auth.createUserWithEmailAndPassword(
    accountCreationEmailInput.value,
    accountCreationPasswordInput.value,
  ).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    firebase.database().ref('users/' +  user.uid).set({
      username:accountCreationUsernameInput.value
   })
  }).catch(alert)
}

const signInUser = () =>{
  auth.signInWithEmailAndPassword(signInEmailInput.value,signInPasswordInput.value)
    .then((userCredential) => {
      let userName = db.ref('users/' + signInEmailInput.value)
      console.log(userName)
      console.log(userCredential)
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
  });
}

const signOutUser = () => {
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
}

firebase.auth().onAuthStateChanged((user) => {
if (user) {
  console.log(user)
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/v8/firebase.User
var uid = user.uid;
// ...
console.log("1")
} else {
// User is signed out
// ...
console.log("2")
}
});
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