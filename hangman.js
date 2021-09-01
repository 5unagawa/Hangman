var targetWord; //word that the player will guess
var blankWord;  //array to hold blank spaces
var chances;    //counter for number of chances left
var prevNum;    //holds value of previous question
var letters = /^[A-Za-z]+$/; //input verification

var fruitArray = [ 
	{val:"apple", image:"image/apple.png"},
	{val:"banana", image:"image/banana.png"},
	{val:"cherry", image:"image/cherry.png"},
	{val:"grapes", image:"image/grapes.png"},
	{val:"kiwifruit", image:"image/kiwifruit.png"},
	{val:"lemon", image:"image/lemon.png"},
	{val:"mango", image:"image/mango.png"},
	{val:"melon", image:"image/melon.png"},
	{val:"orange", image:"image/orange.png"},
	{val:"peach", image:"image/peach.png"},
	{val:"pineapple", image:"image/pineapple.png"},
	{val:"strawberry", image:"image/strawberry.png"},
	{val:"watermelon", image:"image/watermelon.png"}
];
 
//disable buttons on page load
document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});

//button click event
const keys = document.querySelector('.btn-group');
keys.addEventListener('click', (event) => {
  //target clicked button
	const {target} = event;
	
	//check that clicked element is a button. 
	//if not, exit function
	if (!target.matches('button')) {
		return;
	}
	
	//run checkLetter fucntion against key pressed
	//hide the button and update output
	checkLetter(target.value);
	target.style.visibility = "hidden";
	document.getElementById("word").innerHTML = blankWord.join(' ');
	console.log(blankWord);
});

function chooseImage(){
	var randomNum = Math.floor(Math.random() * fruitArray.length);
	while (randomNum == prevNum) {
		randomNum = Math.floor(Math.random() * fruitArray.length);
	}
	targetWord = fruitArray[randomNum].val;
	prevNum = randomNum;
	document.getElementById("chanceImg").src = (fruitArray[randomNum].image);
}

//initializes the game
function startGame(){
  //reset the word to be guessed and disabled buttons
	document.getElementById("word").innerHTML = "";
	document.querySelectorAll('.btn-group button').forEach(elem=> {elem.style.visibility = "visible";});
  
	if (document.getElementById("gametypeCheck").checked == true) {
		let input = prompt("Please enter your word:", "...");
		if (input.match(letters)){ //add check for symbols and numbers
			targetWord = input;
		}
	}
	else {
		chooseImage();
	}
		blankWord = new Array(targetWord.length);
		for (let i=0; i < targetWord.length; i++) {
			blankWord[i] = "_";
		}
		//document.getElementById("chanceImg").src=("image/" + targetWord + ".png");
		console.log("Ready to play");
		document.getElementById("word").innerHTML = blankWord.join(' ');
		console.log(blankWord);
		
    //reset chance counter and images
    chances = 10;
		document.getElementById("chance").innerHTML = "Chances: " + chances;
    //document.getElementById("chanceImg").src=("image/" + chances + ".png");
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = false;});
    //hide start button
		document.getElementById("start-btn").style.visibility="hidden";
    
	//} else {
		//window.alert("Please enter your word again.");
	//}
}
//compare clicked button value against letters in word
function checkLetter(input){
	console.log(input);
	let foundFlag = 0;
	for (let i=0; i < targetWord.length; i++) {
		if (input == targetWord[i].toUpperCase()) {
			blankWord[i] = input;
			foundFlag = 1
		}
	}
	
  //if no match found
  //reduce counter and change image
	if (foundFlag == 0) {
		--chances;
		//document.getElementById("chanceImg").src=("image/" + chances + ".png");
		document.getElementById("chance").innerHTML = "Chances: " + chances;
	
  //if player runs out of guesses
  //alert answer, disable buttons and re-enable start button
  if (chances == 0) {
	  window.alert("Out of chances. Game Over. The word was: " + targetWord);
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
		document.getElementById("start-btn").style.visibility="visible";		
		}
	}
	
  //check that all letters have been found
  //alert player, disable buttons and re-enable start button
	if (blankWord.includes("_") == false) {
		document.getElementById("word").innerHTML = blankWord.join(' ');
		window.alert("Congratulations! You win!");
		document.querySelectorAll('.btn-group button').forEach(elem=> {elem.disabled = true;});
		document.getElementById("start-btn").style.visibility="visible";
	}
}
