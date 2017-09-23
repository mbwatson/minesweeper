// Dimensions
var dim = 600;
var res = 30;
var cells;
var cols;
var rows;
// Colors
var bombColor;
var hiddenColor;
var revealedColor;
var markedColor;

// Game Vars
var alive = true;

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function revealAllCells() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j].hidden = false;
		}
	}
}

function setup() {
	createCanvas(dim + 1, dim + 1);
	bombColor = color(255, 0, 0);
	hiddenColor = color(210, 210, 220);
	revealedColor = color(150, 190, 210);
	markedColor = color(100, 255, 100);
	cols = floor(width / res);
	rows = floor(height / res);
	cells = make2DArray(20, 20);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j] = new Cell(i * res, j * res, random() < 0.15);
		}
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j].value = countNeighborBombs(i, j);
		}
	}
	alive = true;
}

function draw() {
	background(51);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j].show();
		}
	}
}

function countNeighborBombs(i, j) {
	var bomb_count = 0;
	for (var c = -1; c <= 1; c++) {
		for (var r = -1; r <=1; r++) {
			if (0 <= i+c && i+c < cols && 0 <= j+r && j+r < rows) {
				if (cells[i + c][j + r].isBomb === true) {
					bomb_count++;
				}
			}
		}
	}
	return bomb_count;
}

function mousePressed() {
	return false;
}

function mouseReleased() {
	if (!alive) {
		console.log("Game still over.")
		return -1;
	}
	// reveal
	if (mouseButton == LEFT) {
		for (var c = 0; c < cols; c++) {
			for (var r = 0; r < rows; r++) {
				if (cells[c][r].contains(mouseX, mouseY)) {
					var cell = cells[c][r];
					console.log("Reveal cell " + c + "," + r);
					cell.reveal();
					if (cell.isBomb) {
						revealAllCells();
						console.log("Game over. Deal with this later.")
						alive = false;
					} else {
						if (cell.value == 0) {
							revealNeighbors(c, r);
						}
					}
				}
			}
		}
	}
	// mark
	if (mouseButton == RIGHT) {
		for (var c = 0; c < cols; c++) {
			for (var r = 0; r < rows; r++) {
				if (cells[c][r].contains(mouseX, mouseY)) {
					var cell = cells[c][r];
					cell.mark();
				}
			}
		}
	}
	return false;
}

function revealNeighbors(i, j) {
	for (var c = -1; c <= 1; c++) {
		for (var r = -1; r <=1; r++) {
			if (0 <= i+c && i+c < cols && 0 <= j+r && j+r < rows) {
				var neighbor = cells[i + c][j + r];
				if (!neighbor.isBomb && neighbor.hidden) {
					neighbor.reveal();
					if (neighbor.value == 0) {
						revealNeighbors(i+c, j+r);
					}
				}
			}
		}
	}
}

function restart() {
	setup()
}