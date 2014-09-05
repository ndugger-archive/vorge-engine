vorge.camera = function(x, y, canvas, map) {
	
	this.x = x;
	this.y = y;
	
	this.width = canvas.width;
	this.height = canvas.height;
	
	this.viewport = {
		left: this.x,
		top: this.y,
		right: this.x + this.width,
		bottom: this.y + this.height
	};
	
	this.following = {
		x: 0,
		y: 0
	};
	
	this.update = function() {
		
		var entity = this.following;
		
		// horizontal movement
		if (this.x + this.width <= map.width && this.x >= 0) {
			if (entity.x - this.x + (this.width / 2) > this.width) {
				this.x = entity.x - this.width - (this.width / 2);
			} else if (entity.x - (this.width / 2) < this.x) {
				this.x = entity.x - (this.width / 2);
			};
		};
		
		// vertical movement
		if (this.y + this.height <= map.height && this.y >= 0) {
			if (entity.y - this.y + (this.height / 2) > this.height) {
				this.y = entity.y - this.height - (this.height / 2);
			} else if (entity.y - (this.height / 2) < this.y) {
				this.y = entity.y - (this.height / 2);
			};
		};
		
		// update viewport
		this.viewport = {
			left: this.x,
			top: this.y,
			right: this.x + this.width,
			bottom: this.y + this.height
		};
		
	};
	
};