// Dimensions
var dim = 600;
var res = 60;
var cells;
var cols;
var rows;

// Colors
var bombColor;
var hiddenColor;
var revealedColor;
var markedColor;

// Game Control Vars
var alive = true;
var mineCount = 0;
var revealedCount = 0;

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function countMines() {
	var count = 0
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			var cell = cells[i][j];
			if (cell.isBomb) {
				count += 1; 
			}
		}
	}
	return count;
}

function revealAllCells() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			var cell = cells[i][j];
			revealedCount += cell.reveal();
			console.log("Reveal (" + i +"," + j + ")"  )
			console.log(revealedCount);
		}
	}
}

function setup() {
	createCanvas(dim + 1, dim + 1);
	bombColor = color(255, 0, 0);
	hiddenColor = color(210, 210, 220);
	revealedColor = color(150, 190, 210);
	markedColor = color(255, 127, 31);
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
	mineCount = countMines();
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
					if (cell.hidden) {
						console.log("Reveal (" + c +"," + r + ")"  )
						revealedCount += cell.reveal();
					}
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
	console.log(revealedCount);
	return false;
}

function revealNeighbors(i, j) {
	for (var c = -1; c <= 1; c++) {
		for (var r = -1; r <=1; r++) {
			if (0 <= i+c && i+c < cols && 0 <= j+r && j+r < rows) {
				var neighbor = cells[i + c][j + r];
				if (!neighbor.isBomb && neighbor.hidden) {
					revealedCount += neighbor.reveal();
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