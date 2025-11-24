let UserLoggedIn /* please use boolean */ = false 
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
let uid = null

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

const loginRegisterInputDiv = document.querySelector("#loginRegisterInputDiv")

let authMode = "login"

const hideOrShowButtonsUponLoginOrLogout = () => {
  if(UserLoggedIn){
    loginRegisterInputDiv.style.display = "none"
  }else{
    loginRegisterInputDiv.style.display = "flex"
  }
}

const createUser = () =>{
  auth.createUserWithEmailAndPassword(
    accountCreationEmailInput.value,
    accountCreationPasswordInput.value,
  ).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    authMode
    // ...
    firebase.database().ref('users/' +  user.uid).update({
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
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
  });
}

const signOutUser = () => {
  firebase.auth().signOut().then(() => {
    UserLoggedIn = false
  }).catch((error) => {
  // An error happened.
  });
}

firebase.auth().onAuthStateChanged((user) => {
if (user) {
  UserLoggedIn = true
  console.log(user)
uid = user.uid
console.log(uid)

db.ref("users/" + uid).update({
  "online":true
})

console.log("zalogowany")
} else {
  UserLoggedIn = false
  db.ref("users/" + uid).update({
  "online":false
})
  console.log("wylogowany")
}
hideOrShowButtonsUponLoginOrLogout()
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
const someButton = document.getElementById("someButton");
const pongGame = document.getElementById("pongGame");
const ctx = pongGame.getContext("2d");
//ball variables
let BallX = 250;
let BallY = 250;
let BallYDestination = 250
const radius = 50
const startAngle = 0
const endAngle = 2 * Math.PI
let DeltaX = 5 
let DeltaY = 5
//player variables
const playerOneX = 20
let playerOneY = 210

const playerTwoX = 480
let playerTwoY =  210

//code
const drawBall = () => {
ctx.beginPath()
ctx.arc(BallX, BallY, radius, startAngle, endAngle)
ctx.fill()
}
const drawPlayerOne = () => {
  ctx.fillRect(playerOneX,playerOneY,10,100)
}

const drawPlayerTwo = () => {
  ctx.fillRect(playerTwoX, playerTwoY,10,100)
}

drawPlayerOne()
drawPlayerTwo()
const updateGame  = () => {
  updateBall()
  updatePlayerOne()
  updatePlayerTwo()
}
// THE FUNCION BELOW MAKES PONG CANVAS GO BRRR IF CALLED THRICE
const updateBall = () => {
  let direction = "right";
  setInterval(() => {
    ctx.clearRect( 0,0,500,500 )
        drawBall()
    BallX += DeltaX
    BallY += DeltaY
    //DeltaX = Math.abs(DeltaX)+0.5
    if (BallX + radius >= 500|| BallX - radius <= 30){
      DeltaX = -DeltaX
      DeltaY = (Math.random() * 5) + 1
    }
    if (BallY + radius >= 500|| BallY - radius <= 30){
      DeltaY = -DeltaY
    }
  }, 30);
};

const updatePlayerOne = () =>{
  setInterval(() => {
    ctx.clearRect(10,0,30,500)
    drawPlayerOne()
    db.ref("users/" + uid).update({
      "playerOneY":playerOneY
     })
  },60)
}

const updatePlayerTwo = () => {
    setInterval(() => {
    ctx.clearRect(490,0,30,playerTwoY)
    drawPlayerTwo()
    db.ref("users/" + uid).update({
      "playerOneY":playerOneY
     })
  },60)
}


document.addEventListener("keydown",(event)=>{
  let keyPressed = event.key
  if (keyPressed == "s"){
    playerOneY += 10
    if(playerOneY >= 400){
      playerOneY= 400
    }
    updatePlayerOne()
  }else if(keyPressed == "w"){
    playerOneY -= 10
    if(playerOneY <= 0){
      playerOneY = 0
    }
    updatePlayerOne()
  }
  //player 2 
  if (keyPressed == "ArrowDown"){
    playerTwoY += 10
    if(playerTwoY >= 400){
      playerTwoY = 400
    }
    updatePlayerTwo()
  }else if(keyPressed == "ArrowUp"){
    playerTwoY -= 10
    if(playerTwoY <= 0){
      playerTwoY = 0
    }
    updatePlayerTwo()
  }

})


document.addEventListener("keydown",(event)=>{

})

window.onbeforeunload = function(){
  db.ref("users/" + uid).update({
  "online":false
  })
}