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
// Game Vars
var Alive = true;

function revealAllCells() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j].hidden = false;
		}
	}
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(dim + 1, dim + 1);
	bombColor = color(255, 0, 0);
	hiddenColor = color(210, 210, 220);
	revealedColor = color(150, 190, 210);
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

function mouseReleased() {
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
					console.log("Mark cell " + c + "," + r);
				}
			}
		}
	}
	return false;
}

function mouseClicked() {
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