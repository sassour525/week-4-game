var gameNumber; //random number player will have to try and match 
var playerScore; //holds players current score
var imageCrystal; //hold crystal images
var crystalValue; //value assigned to the crystal images
var crystalValueArray; //array of values that will be assigned to crystalValue
var clickedCrystalValue; //value of the specific crystal that was clicked
var wins; //current games won
var losses; //current games loss

function init() {
	//initialize game variables
	gameNumber = Math.floor(Math.random() * (120 - 19) + 19);
	playerScore = 0;
	crystalValueArray = [];
	clickedCrystalValue = 0;
	wins = sessionStorage.getItem('wins') || 0;
	losses = sessionStorage.getItem('losses') || 0;

	$("#number").html(gameNumber) //display current number player is trying to match
	$("#wins").html("Wins: " + wins); //display games won
	$("#losses").html("Losses: " + losses); //display games loss
	$("#score").html("Your score is: " + playerScore); //display players current score

	generateCrystalValue(); //generate crystal values when page loads
	createCrystals(); //create crystals on page load
	game(); //call game function to start calcualting player score once crystals are clicked
}

function game() {
//game logic

	$(".crystal-image").on("click", function() {

		//if the game is already over - do not allow crystal clicks
		if($("#result").html() != "") return;

		//grab the current crystal that was clicked value to calcualte player
	 	clickedCrystalValue = ($(this).attr("data-value"));
	 	clickedCrystalValue = parseInt(clickedCrystalValue);

	 	//add the crystal that was clicked value to the playerScore
	 	playerScore += clickedCrystalValue;

	 	$("#score").html("Your score is: " + playerScore);

		if (playerScore == gameNumber) {
			//winning logic if playerScore is equal to the gameNumber
			$("#result").html("You WIN!");
			$("#result").css("color", "green");
			wins++;
			sessionStorage.setItem('wins', wins);
			$("#wins").html("Wins: " + wins);
		}

		if (playerScore > gameNumber) {
			//losing logic if playerScore is greater than gameNumber
			$("#result").html("You LOSE!");
			$("#result").css("color", "red");
			losses++;
			sessionStorage.setItem('losses', losses);
			$("#losses").html("Losses: " + losses);
		}
	});
}

function generateCrystalValue() {
// generates a number value assigned to each clickable crystal

	for (var j = 0; j < 4; j++) {
		//loop to generate the value for each crystal on the screen
		crystalValue = Math.floor(Math.random() * (12 - 1) + 1);
		if (crystalValueArray.indexOf(crystalValue) <= -1) {
			//if the value is not already in the array add it to the array
			crystalValueArray.push(crystalValue);
		} else {
			//additioanl random number generator to try and keep from duplicates being assigned
			crystalValueArray.push(Math.floor(Math.random() * (12 - 1) + 1));
		}
	}
}

function createCrystals() {
// creates 4 crystals on the screen to click during the game

	for (var i = 0; i < 4; i++) {
		//create crystal images displayed on the screen
		imageCrystal = $("<img>");
		imageCrystal.addClass("crystal-image");
		imageCrystal.attr("src", "assets/images/crystal_" + i + ".png");
		imageCrystal.attr("data-value", crystalValueArray[i]);
		$("#crystals").append(imageCrystal);
	}

}

function resetGame() {
// resets the game variables after losing or winning the game
	$("#crystals").html("");
	$("#result").html("");
	// sessionStorage.clear();
	init();
}

function clearGame() {
	$("#crystals").html("");
	$("#result").html("");
	sessionStorage.clear();
	init();
}

//on window load variables are initialized
window.onload = function() {
	init();
	document.getElementById("play-button").onclick = resetGame;
	document.getElementById("reset-button").onclick = clearGame; //When reset button is clicked call resetGame function
}