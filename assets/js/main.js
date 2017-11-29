// Dimensions
const sideLength = 600;
const res = 50; // resolution, i.e., number of cells in each row/column
const colors = {};
const mineProbability = 0.15;
	
function setup() {
	// define colors
	colors.hidden = color(210, 210, 220);
	colors.revealed = color(150, 190, 210);
	colors.mine = color(200,50,50);
	colors.marked = color(255, 127, 31);
	createCanvas(sideLength + 1, sideLength + 1);
	// calculate how to chop the canvas
	cols = floor(width / res);
	rows = floor(height / res);
	// create game
	game = new Game(cols, rows);
	// show game control ui
	showGUI();
}

function draw() {
	game.update();
	game.board.draw();
	updateGUI();
}

function mouseReleased() {
	if (!game.isWon()) {
		// mark cell
		if (mouseButton == RIGHT) {
			for (var c = 0; c < game.board.cols; c++) {
				for (var r = 0; r < game.board.rows; r++) {
					if (game.board.cells[c][r].contains(mouseX, mouseY)) {
						game.markCell(c,r);
					}
				}
			}
		}
		// reveal cell
		if (mouseButton == LEFT) {
			for (var c = 0; c < game.board.cols; c++) {
				for (var r = 0; r < game.board.rows; r++) {
					if (game.board.cells[c][r].contains(mouseX, mouseY)) {
						game.revealCell(c,r);
					}
				}
			}
		}
		if (game.isWon()) {
			console.log("You won!");
		}
	}
	return false;
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function showGUI() {
  let minesCountDiv = document.getElementById("mines-count");
  minesCountDiv.innerHTML = game.minesCount;
}

function updateGUI() {
  let revealedCellsCountDiv = document.getElementById("revealed-cells-count");
  revealedCellsCountDiv.innerHTML = game.countRevealedCells();
  let timerSpan = document.getElementById("game-timer");
  timerSpan.innerHTML = `${game.timer}`;
  let messageSpan = document.getElementById("message");
  messageSpan.innerHTML = game.message();
}

function newGame() {
	console.log("New game...");
	game = new Game(cols, rows);
}