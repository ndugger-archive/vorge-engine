vorge.event = function(x, y, w, h) {
	
	var event = this;
	
	event.x = x;
	event.y = y;
	event.width = w;
	event.height = h;
	
	event.sprite = new Image();
	event.sprite.src = "vorge/eventNull.png";
	
	this.load = new Promise(function(resolve, reject) {
		event.sprite.onload = function() {
			resolve(event);
		}
	});
	
	this.draw = function(canvas) {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(
			event.sprite,
			32, 32, event.width, event.height,
			event.x, event.y, event.width, event.height
		);
	};
	
}