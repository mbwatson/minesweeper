// Dimensions
const sideLength = 500;
const res = 25; // resolution, i.e., number of cells in each row/column
const colors = {};

function setup() {
	// define colors
	colors.hidden = color(210, 210, 220);
	colors.revealed = color(150, 190, 210);
	colors.mine = color(200,50,50);
	colors.marked = color(255, 127, 31);
	// create canvas
	createCanvas(sideLength + 1, sideLength + 1);
	// calculate how to chop the canvas
	cols = floor(width / res);
	rows = floor(height / res);
	// create game
	game = new Game(cols, rows);
	// initialize game board with some mines
	// game.board.initializeCells();
}

function draw() {
	game.board.draw();
}

function mouseReleased() {
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
	// if (gameWon() == true) {
	// 	console.log("Winner!");
	// }
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
