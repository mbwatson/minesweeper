class Cell {
	constructor(col, row, isMine) {
		this.col = col;
		this.row = row;
		this.x = col * res;
		this.y = row * res;
		this.isMine = isMine || false;
		this.hidden = true;
		this.value = -1;
		this.marked = false;
	}
	draw() {
		if (this.hidden) {
			fill(colors.hidden);
			rect(this.x, this.y, res, res);
			if (this.marked) {
				this.drawX();
			}
		} else { // this cell is revealed
			if (this.isMine) {
				fill(colors.mineBackground);
				rect(this.x, this.y, res, res);
				this.drawMine();
			} else {
				if (this.value > 0) {
					fill(colors.revealed);
					rect(this.x, this.y, res, res);
					this.drawLabel();
				} else {
					fill(colors.revealedEmpty);
					rect(this.x, this.y, res, res);
				}
			}
		}
	}
	drawMine() {
		fill(colors.mine);
		ellipse(this.x + res/2, this.y + res/2, res/2, res/2);
	}
	drawLabel() {
		textAlign(CENTER, CENTER);
		fill(0);
		noStroke();
		textSize(res/2);
		text(this.value, this.x + res/2, this.y + res/2);
		stroke(0);
	}

	drawX() {
		stroke(color(255,50,50));
		line(this.x, this.y, this.x + res, this.y + res);
		line(this.x, this.y + res, this.x + res, this.y);
		stroke(0);
	}

	mark() {
		this.marked = !this.marked;
		// console.log(`(un)mark cell (${this.x/res},${this.y/res})`);
	}

	reveal() {
		if (this.hidden) {
			this.hidden = false;
			return true;
		} else {
			return false;
		}
	}

	contains(x, y) {
		return (this.x < x-1 && x-1 < this.x + res && this.y < y-1 && y-1 < this.y + res);
	}

}