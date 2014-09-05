vorge.player = function(w, h, s) {
	
	var player = this;
	
	// player dimensions
	this.width = w;
	this.height = h;
	
	// Walking speed
	this.s = s;
	
	this.sprite = new Image();
	this.sprite.src = "vorge/spriteNull.png";
	
	player.spawn = function(x, y) {
		player.x = x;
		player.y = y;
	}
	
	// Yay promises!
	this.load = new Promise(function(resolve, reject) {
		player.sprite.onload = function() {
			resolve(player);
		};
	});
	
	this.draw = function(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(
			this.sprite,
			0, 0, this.width, this.height,
			this.x, this.y, this.width, this.height
		);
	};
	
	this.update = function(map) {
		
		if (vorge.controls.left && this.x >= 0) {
			this.x -= this.s;
		};
		if (vorge.controls.up && this.y >= 0) {
			this.y -= this.s;
		};
		if (vorge.controls.right && this.x + this.width <= map.width) {
			this.x += this.s;
		};
		if (vorge.controls.down && this.y + this.height <= map.height) {
			this.y += this.s;
		};
		
	};
	
};