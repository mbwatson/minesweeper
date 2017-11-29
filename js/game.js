class Game {
	constructor(cols, rows) {
		this.board = new Board(rows, cols);
		this.alive = true;
	}
	markCell(i,j) {
		if (this.board.cells[i][j].hidden) {
			this.board.cells[i][j].mark();
		}
	}
	revealCell(i,j) {
		let cell = this.board.cells[i][j];
		if (cell.reveal()) {
			if (cell.isMine) {
				this.revealAllCells();
				console.log("boom.")
				game.alive = false;
			} else {
				if (cell.value == 0) {
					this.revealNeighborsOfCell(i,j);
				}
			}
		}
	}
	revealNeighborsOfCell(i, j) {
		for (var c = -1; c <= 1; c++) {
			for (var r = -1; r <=1; r++) {
				if (0 <= i+c && i+c < cols && 0 <= j+r && j+r < rows) {
					var neighbor = this.board.cells[i + c][j + r];
					if (!neighbor.isMine && neighbor.hidden) {
						neighbor.reveal();
						if (neighbor.value == 0) {
							this.revealNeighborsOfCell(i+c, j+r);
						}
					}
				}
			}
		}
	}
	revealAllCells() {
		for (var i = 0; i < this.board.cols; i++) {
			for (var j = 0; j < this.board.rows; j++) {
				this.board.cells[i][j].reveal();
			}
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

