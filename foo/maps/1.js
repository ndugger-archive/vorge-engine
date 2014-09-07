// Creating fake map... (for development)

var fauxWidth = 1280;
var fauxHeight = 960;
var fauxTiles = [];

function fauxTile(x, y, imgx, imgy) {
	this.x = x;
	this.y = y;
	this.w = 32;
	this.h = 32;
	this.imgx = imgx;
	this.imgy = imgy
};

var x = 0, y = 0, c = true;
while (x < fauxWidth) {
	while (y < fauxHeight) {
		if (c) {
			var imgx = 32;
		} else {
			var imgx = 192;
		}
		var tile = new fauxTile(x, y, imgx, 224);

		fauxTiles.push(tile);

		c = c ? false : true;

		y += 32;
	};
	y = 0;
	c = c ? false : true;
	x += 32;
};

// Load the map into vorge

vorge.load.map({
	
	type: "map",
	
	name: "Checkered Dirt Arena",
	
	width: fauxWidth,
	height: fauxHeight,
	grid: 32,
	tiles: fauxTiles,
	
	tileset: "default.png",
	
	events: [
		
		new vorge.event({
			name: "Something",
			actions: function() {
				console.log("I'm an event");
			}
		})
		
	]
	
})