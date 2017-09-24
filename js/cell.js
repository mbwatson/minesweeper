function Cell(x, y, isMine) {
	this.x = x;
	this.y = y;
	this.isMine = isMine || false;
	this.hidden = true;
	this.value = -1;
	this.fillcolor = hiddenColor;
	this.marked = false;

	this.show = function() {
		if (this.hidden) {
			if (this.marked) {
				fill(markedColor);
			} else {
				fill(hiddenColor);
			}
			rect(this.x, this.y, res, res);
		} else {
			fill(revealedColor);
			rect(this.x, this.y, res, res);
			if (this.isMine) {
				fill(150, 50, 50);
				ellipse(this.x + res/2, this.y + res/2, 0.75*res, 0.75*res);
			} else {
				if (this.value != 0) {
					textSize(14);
					fill(0, 0, 0);
					text(this.value, this.x + res/2 - 4, this.y + res/2 + 5);
				}
			}
		}
	}

	this.contains = function(x, y) {
		return (this.x < x-1 && x-1 < this.x + res && this.y < y-1 && y-1 < this.y + res);
	}

	this.reveal = function() {
		if (this.hidden === true) {
			this.hidden = false;
			return 1;
		} else {
			return 0;
		}
	}

	this.mark = function() {
		if (this.hidden) {
			if (this.marked) {
				this.marked = false;
				console.log("Unmark cell (" + this.x/res + "," + this.y/res + ")");
			} else {
				this.marked = true;
				console.log("Mark cell (" + this.x/res + "," + this.y/res + ")");
			}
		}
	}

}