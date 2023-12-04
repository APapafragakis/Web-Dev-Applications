let rollingSound = new Audio('dice-rolling.mp3')
let winSound = new Audio('winning-sound.mp3')

var snakePositions = [13, 38, 46, 73, 82, 89]
var snakeNewPositions = [12, 18, 36, 43, 62, 79]

var ladderPositions = [6, 31, 47, 56, 78]
var ladderNewPositions = [27, 71, 58, 67, 88]

var snakes_or_ladders_Positions = [25, 29, 65, 70]
var snakes_or_ladders_NewPositions = ["4 or 45", "9 or 49", "54 or 84", "40 or 90"]

var septemberEffect = [11, 55, 88]

function setPositions() {
	var positions = [];
	for (var i = 1; i <= 90; i++) {
		positions[i] = new Object();
		positions[i].from = i;


		if (snakePositions.indexOf(i) != -1) {
			positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
			positions[i].type = "Snake";
		}
		else if (ladderPositions.indexOf(i) != -1) {
			positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
			positions[i].type = "Ladders";
		}
		else if (snakes_or_ladders_Positions.indexOf(i) != -1) {
			positions[i].to = snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
			positions[i].type = "Snake or Ladders";
		}
		else if (i === 11 || i === 55 || i === 88) {
			positions[i].to = i;
			positions[i].type = "September";
		}
		else if (i === 22 || i === 44 || i === 77) {
			positions[i].to = i;
			positions[i].type = "Swords";
		}
		else {
			positions[i].to = i;
			positions[i].type = "Normal";

		}
	}
	return positions;
}

var cells = setPositions();
for (var i = 1; i <= 90; i++) {
	console.log("Cell: " + i + " type: " + cells[i].type + " From: " + cells[i].from + " To: " + cells[i].to)
}

var currentPlayer = 1;
var newPosition = 0;
var currentPlayerIndexValueRed = 0;
var currentPlayerIndexValueWhite = 0;
var whiteSeptEffect = 1;
var redSeptEffect = 1;

function play() {
	changePosition(); 
	hasPlayerWon();
}


function getPlayerTurn() {
	var togElement = document.getElementById("tog");
	var diceElement = document.getElementById("dice");
	togElement.className = 'default-text';
	diceElement.textContent = newPosition;

	if (currentPlayer === 1) {
		togElement.textContent = "White's Turn";
		togElement.className = 'white-text';

		if (currentPlayerIndexValueWhite !== 0) {
			updateGUI("before", "White's Turn");
		}
		currentPlayerIndexValueWhite = currentPlayerIndexValueWhite + newPosition; 

		let whiteSeptemberEffect = septemberEffect.findIndex(x => x === currentPlayerIndexValueWhite);
		if (whiteSeptemberEffect !== -1) {
			whiteSeptEffect = 1;
		}

		let whiteLadderPosition = ladderPositions.findIndex(x => x === currentPlayerIndexValueWhite);
		if (whiteLadderPosition !== -1) {
			currentPlayerIndexValueWhite = ladderNewPositions[whiteLadderPosition];
		}

		let whiteSnakePosition = snakePositions.findIndex(x => x === currentPlayerIndexValueWhite);
		if (whiteSnakePosition !== -1 && whiteSeptEffect === 0) {
			currentPlayerIndexValueWhite = snakeNewPositions[whiteSnakePosition];
			console.log("updated ladder position", currentPlayerIndexValueWhite)

		}else if (whiteSnakePosition !== -1 && whiteSeptEffect === 1){
			randomGrade = Math.floor(Math.random() * 10) + 1;
			if(randomGrade <5){
				currentPlayerIndexValueWhite = snakeNewPositions[whiteSnakePosition];
				whiteSeptEffect = 0;
			}else{
				whiteSeptEffect = 0;
			}
		}

		let whiteSnakeOrLadderPosition = snakes_or_ladders_Positions.findIndex(x => x === currentPlayerIndexValueWhite);
		if (whiteSnakeOrLadderPosition !== -1) {
			let randomGrade = Math.floor(Math.random() * 10) + 1;
			console.log("randomGrade", randomGrade);
			if (randomGrade < 5) {
				let snakesOrLaddresNewPosition = snakes_or_ladders_NewPositions[whiteSnakeOrLadderPosition];
				let indexValue = snakesOrLaddresNewPosition.split(" ")[0];
				console.log("indexValue less than 5", indexValue)
				currentPlayerIndexValueWhite = Number(indexValue);
			} else {
				let snakesOrLaddresNewPosition = snakes_or_ladders_NewPositions[whiteSnakeOrLadderPosition];
				let indexValue = snakesOrLaddresNewPosition.split(" ")[2];
				console.log("indexValue greater than 5", indexValue)
				currentPlayerIndexValueWhite = Number(indexValue);
			}
		}


		if (currentPlayerIndexValueWhite > 90) {
			currentPlayerIndexValueWhite = currentPlayerIndexValueWhite - (2 * newPosition);
		}

		updateGUI(currentPlayerIndexValueWhite, "after", "White's Turn");
		currentPlayer = 2;


	} else if (currentPlayer === 2) {
		togElement.textContent = "Red's Turn";
		togElement.className = 'red-text';

		if (currentPlayerIndexValueRed !== 0) {
			updateGUI("before", "Red's Turn");
		}
		currentPlayerIndexValueRed = currentPlayerIndexValueRed + newPosition;
		console.log("at ladder position red", currentPlayerIndexValueWhite);

		let redSeptemberEffect = septemberEffect.findIndex(x => x === currentPlayerIndexValueRed);
		if (redSeptemberEffect !== -1) {
			redSeptEffect = 1;
		}

		let redLadderPosition = ladderPositions.findIndex(x => x === currentPlayerIndexValueRed);
		console.log("index value of ladder updated positon red", redLadderPosition);
		if (redLadderPosition !== -1) {
			currentPlayerIndexValueRed = ladderNewPositions[redLadderPosition];
			console.log("updated ladder position red", currentPlayerIndexValueRed)
		}

		let redSnakePosition = snakePositions.findIndex(x => x === currentPlayerIndexValueRed);
		console.log("index value of snake updated positon", redSnakePosition);
		if (redSnakePosition !== -1 && redSeptEffect === 0) {
			currentPlayerIndexValueRed = snakeNewPositions[redSnakePosition];
			console.log("updated ladder position", currentPlayerIndexValueRed)
		}else if (redSnakePosition !== -1 && redSeptEffect === 1){
			randomGrade = Math.floor(Math.random() * 10) + 1;
			if(randomGrade <5){
				currentPlayerIndexValueRed = snakeNewPositions[redSnakePosition];
				redSeptEffect = 0;
			}else{
				redSeptEffect = 0;
			}
		}

		let redSnakeOrLadderPosition = snakes_or_ladders_Positions.findIndex(x => x === currentPlayerIndexValueRed);
		if (redSnakeOrLadderPosition !== -1) {
			let randomGrade = Math.floor(Math.random() * 10) + 1;
			console.log("randomGrade", randomGrade);
			if (randomGrade < 5) {
				let snakesOrLaddresNewPosition = snakes_or_ladders_NewPositions[redSnakeOrLadderPosition];
				let indexValue = snakesOrLaddresNewPosition.split(" ")[0];
				console.log("indexValue less than 5", indexValue)
				currentPlayerIndexValueRed = Number(indexValue);
			} else {
				let snakesOrLaddresNewPosition = snakes_or_ladders_NewPositions[redSnakeOrLadderPosition];
				let indexValue = snakesOrLaddresNewPosition.split(" ")[2];
				console.log("indexValue greater than 5", indexValue)
				currentPlayerIndexValueRed = Number(indexValue);
			}
		}


		if (currentPlayerIndexValueRed > 90) {
			currentPlayerIndexValueRed = currentPlayerIndexValueRed - (2 * newPosition);
		}
		updateGUI("after", "Red's Turn");
		currentPlayer = 1;
	}
}

function updateGUI(previousPosition, Turn) {
	if (Turn === "Red's Turn") {
		if (previousPosition === "before") {
			if (currentPlayerIndexValueRed != currentPlayerIndexValueWhite) {
				document.getElementById('position' + currentPlayerIndexValueRed).innerHTML = "<img  src='images/" + currentPlayerIndexValueRed + ".png'  height=70 width=80></div>";
			} else {
				document.getElementById('position' + currentPlayerIndexValueRed).innerHTML = "<img  src='imagesWhite/" + currentPlayerIndexValueRed + ".png'  height=70 width=80></div>";
			}
		} else {
			if (currentPlayerIndexValueRed != currentPlayerIndexValueWhite) {
				document.getElementById('position' + currentPlayerIndexValueRed).innerHTML = "<img  src='imagesRed/" + currentPlayerIndexValueRed + ".png'  height=70 width=80></div>";
			} else {
				document.getElementById('position' + currentPlayerIndexValueRed).innerHTML = "<img  src='imagesBoth/" + currentPlayerIndexValueRed + ".png'  height=70 width=80></div>";
			}
		}
	} else {
		if (previousPosition === "before") {
			if (currentPlayerIndexValueRed != currentPlayerIndexValueWhite) {
				document.getElementById('position' + currentPlayerIndexValueWhite).innerHTML = "<img  src='images/" + currentPlayerIndexValueWhite + ".png'  height=70 width=80></div>";
			} else {
				document.getElementById('position' + currentPlayerIndexValueWhite).innerHTML = "<img  src='imagesRed/" + currentPlayerIndexValueWhite + ".png'  height=70 width=80></div>";
			}
		} else {
			if (currentPlayerIndexValueRed != currentPlayerIndexValueWhite) {
				document.getElementById('position' + currentPlayerIndexValueWhite).innerHTML = "<img  src='imagesWhite/" + currentPlayerIndexValueWhite + ".png'  height=70 width=80></div>";
			} else {
				document.getElementById('position' + currentPlayerIndexValueWhite).innerHTML = "<img  src='imagesBoth/" + currentPlayerIndexValueWhite + ".png'  height=70 width=80></div>";
			}
		}
	}
}

diceImage.className = 'start'; 
function updateDiceImage(newPosition) {
	diceImage.className = 'begin';
	diceImage = document.getElementById('diceImage');
	diceImage.src = "ImagesDice/" + newPosition + ".png";
}

function hasPlayerWon() {
	if (currentPlayerIndexValueRed === 90) {
		winSound.play()
		alert("Red Won !!")
		location.reload()
	}
	if (currentPlayerIndexValueWhite === 90) {
		winSound.play()
		alert("White Won !!")
		location.reload()
	}
}

function changePlayerTurn() {
	if (currentPlayer === 1) {
		currentPlayer = 2;
	} else {
		currentPlayer = 1;
	}
}

function changePosition() {
	rollingSound.play()
	newPosition = Math.floor(Math.random() * 6) + 1;
	updateDiceImage(newPosition);

	if (newPosition === 6) {
		getPlayerTurn();
		changePlayerTurn();
	} else {
		getPlayerTurn();
	}
}


