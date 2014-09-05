vorge.controls = {
	
	up: false,
	right: false,
	down: false,
	left: false,
	
	init: function() {
		
		window.addEventListener("keydown", function(e) {
			switch(e.keyCode) {
				case 37: // left arrow
					vorge.controls.left = true;
					break;
				case 38: // up arrow
					vorge.controls.up = true;
					break;
				case 39: // right arrow
					vorge.controls.right = true;
					break;
				case 40: // down arrow
					vorge.controls.down = true;
					break;
			};
		});
		
		window.addEventListener("keyup", function(e){
			switch(e.keyCode) {
				case 37: // left arrow
					vorge.controls.left = false;
					break;
				case 38: // up arrow
					vorge.controls.up = false;
					break;
				case 39: // right arrow
					vorge.controls.right = false;
					break;
				case 40: // down arrow
					vorge.controls.down = false;
					break;	
			};
		});
		
	}
	
};
vorge.controls.init();