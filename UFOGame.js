var targetWord; //word that the player will guess
var blankWord;  //array to hold blank spaces
var chances;    //counter for number of chances left
var prevNum;    //holds value of previous question
var letters = /^[A-Za-z]+$/; //input verification

var grade3Dict = [ 
	"affect", "asleep", "bell", "body", "brain", "bright", "cross", "concentrate", "daytime", "energy",
    "habit", "held", "improve", "lack", "lose", "lost", "minute", "nap", "result", "screen",
    "sign", "sir", "tonight", "walker" 
];

var grade2Dict = [
	"actor", "almost", "beaver", "believe", "bring", "build", "care", "case", "character", "coat", "could", "cried", "cry", "dam", "degrees", 
	"difficult", "each", "easy", "email", "engineer", "evening", "everything", "exactly", "expensive", "farewell", "ferret", "forget", 
	"free", "furniture", "garbage", "goldfish", "guide", "hallway", "hamster", "healthy", "history", "hope", "hurry", 
	"instead", "interested", "late", "later", "lobster", "local", "lodge", "machine", "maybe", "meeting", "moment", "move", "nail", "national", "noodle", "nothing", "overseas", "parrot", "pet", 
	"plan", "pleasure", "potato", "present", "pretzel", "protect", "quiz", "racket", "raincoat", "rule", "said", "sang", "sharpen", "should", "sketchbook", "soil", "soon", 
	"squirrel", "step", "temperature", "toothpick", "trouble", "true", "turtle", "vendor", "voice", "will", "windy", "worried", "worry", "wrong",
];

var grade1Dict = [
	"any", "aunt", "break", "catch", "change", "classmate", "cousin", "dancer", "draw", "during", 
	"everyone", "father", "firefighter", "friendly", "grandfather", "grandmother", "guitar", "keep", "kilometer", "love", 
	"monkey", "mother", "night", "pardon", "perform", "picture", "rabbit", "sheep", "show", "shy", 
	"skate", "ski", "student", "sure", "talent", "their", "then", "tiger", "tomorrow", "uncle", "with"	
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

function chooseImage(inputArray){
	var randomNum = Math.floor(Math.random() * inputArray.length);
	while (randomNum == prevNum) {
		randomNum = Math.floor(Math.random() * inputArray.length);
	}
	targetWord = inputArray[randomNum];
	prevNum = randomNum;
	//document.getElementById("chanceImg").src = (fruitArray[randomNum].image);
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
		//use selected difficulty level to create dictionary and choose a new word
		var checked_level = document.querySelector('input[name= "level"]:checked');
		console.log(checked_level.value);
		if (checked_level.value == "1") {
			chooseImage(grade1Dict);	
		}
		else if (checked_level.value == "2") {
			chooseImage(grade2Dict);	
		}
		else if (checked_level.value == "3") {
			chooseImage(grade3Dict);	
		}
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
    document.getElementById("chanceImg").src=("assets/img/ufo/" + chances + ".png");
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
		document.getElementById("chanceImg").src=("assets/img/ufo/" + chances + ".png");
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
