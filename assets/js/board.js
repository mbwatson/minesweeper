class Board {
	constructor(rows, cols) {
		this.cols = cols;
		this.rows = rows;
		this.cells = make2DArray(cols, rows);
	}
	revealCell(i,j) {
		return this.cell[i][j].reveal();
	}
	draw() {
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.cells[i][j].draw();
			}
		}
	}

}