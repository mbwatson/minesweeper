class Board {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.bgcolor = color(200,200,200);
		this.cells = make2DArray(cols, rows);
		this.initializeCells();
	}

	revealCell(i,j) {
		return this.cell[i][j].reveal();
	}
	
	initializeCells() {
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.cells[i][j] = new Cell(i, j, random() < 0.15);
			}
		}
		for (var i = 0; i < cols; i++) {
			for (var j = 0; j < rows; j++) {
				this.cells[i][j].value = this.countNeighborMines(i, j);
			}
		}
	}

	countNeighborMines(i, j) {
		var mineCount = 0;
		for (var c = -1; c <= 1; c++) {
			for (var r = -1; r <=1; r++) {
				if (0 <= i+c && i+c < this.cols && 0 <= j+r && j+r < this.rows) {
					if (this.cells[i + c][j + r].isMine === true) {
						mineCount++;
					}
				}
			}
		}
		return mineCount;
	}

	draw() {
		background(this.bgcolor);
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.cells[i][j].draw();
			}
		}
	}

}