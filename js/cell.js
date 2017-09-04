function Cell(x, y, isBomb) {
	this.x = x;
	this.y = y;
	this.isBomb = isBomb || false;
	this.hidden = true;
	this.value = -1;
	this.fillcolor = hiddenColor;

	this.show = function() {
		if (this.hidden) {
			fill(hiddenColor);
			rect(this.x, this.y, res, res);
		} else {
			fill(revealedColor);
			rect(this.x, this.y, res, res);
			if (this.isBomb) {
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
		}
	}

}