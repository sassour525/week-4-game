var gameNumber;
var playerScore;
var imageCrystal;
var crystalValue;
var crystalValueArray;
var clickedCrystalValue;
var wins;
var losses;

function init() {
	gameNumber = Math.floor(Math.random() * (120 - 19) + 19);
	playerScore = 0;
	console.log(gameNumber);
	crystalValueArray = [];
	clickedCrystalValue = 0;
	wins = 0;
	losses = 0;

	$("#number").html(gameNumber)
	$("#wins").html("Wins: " + wins);
	$("#losses").html("Losses: " + losses);
	$("#score").html("Your score is: " + playerScore);

	
	generateCrystalValue();
	createCrystals();
	game();
}

function game() {

	$(".crystal-image").on("click", function() {

	 	clickedCrystalValue = ($(this).attr("data-value"));
	 	clickedCrystalValue = parseInt(clickedCrystalValue);

	 	playerScore += clickedCrystalValue;

	 	console.log(playerScore);

	 	$("#score").html("Your score is: " + playerScore);

		if (playerScore == gameNumber) {
			console.log("YOU WIN");
			wins++;
			$("#wins").html("Wins: " + wins);
			resetGame();
		}

		if (playerScore > gameNumber) {
			console.log("YOU LOSE");
			losses++;
			$("#losses").html("Losses: " + losses);
			resetGame();
		}
	});
}

function generateCrystalValue() {

	for (var j = 0; j < 4; j++) {
		crystalValue = Math.floor(Math.random() * (12 - 1) + 1);
		if (crystalValueArray.indexOf(crystalValue) <= -1) {
			crystalValueArray.push(crystalValue);
		} else {
			crystalValueArray.push(Math.floor(Math.random() * (12 - 1) + 1));
		}
		console.log(crystalValue);
		console.log(crystalValueArray);
	}
}

function createCrystals() {

	for (var i = 0; i < 4; i++) {
		imageCrystal = $("<img>");
		imageCrystal.addClass("crystal-image");
		imageCrystal.attr("src", "assets/images/crystal_" + i + ".png");
		imageCrystal.attr("data-value", crystalValueArray[i]);
		$("#crystals").append(imageCrystal);
		console.log(imageCrystal);
	}

}

function resetGame() {
	init();
}

window.onload = init;