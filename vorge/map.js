vorge.map = function(map, game) {
	
	this.name = map.name;
	
	this.width = map.width;
	this.height = map.height;
	
	this.events = map.events;
	
	this.grid = map.grid;
	
	this.tiles = map.tiles;
	
	this.tileset = new Image();
	this.tileset.src = game.assets + "/tilesets/" + map.tileset;
	
	var self = this;
	
	this.load = new Promise(function(resolve, reject) {
		self.tileset.onload = function() {
			resolve(self);
		};
	});
	
	this.draw = function(canvas) {
		var ctx = canvas.getContext("2d");
		var map = this;
		var i = 0, count = map.tiles.length;
		while (i < count) {
			var tile = map.tiles[i];
			if (tile.x < canvas.width && tile.y < canvas.height) {
				ctx.drawImage(
					this.tileset, 
					tile.imgx, tile.imgy, tile.w, tile.h,
					tile.x, tile.y, tile.w, tile.h
				);
			};
			i++;
		};
	};
	
	/*var map = this;
	
	// TODO: load a real map later
		
	var fauxWidth = 1280;
	var fauxHeight = 960;
	var fauxTileSize = 32;
	var fauxTiles = [];

	function fauxTile(x, y, i) {
		this.x = x;
		this.y = y;
		this.w = fauxTileSize;
		this.h = fauxTileSize;
		this.i = i;
	};

	var x = 0, y = 0, c = true;
	while (x < fauxWidth) {
		while (y < fauxHeight) {

			if (c) {
				var imgx = 0;
			} else {
				var imgx = 32;
			}
			var tile = new fauxTile(x, y, imgx);

			fauxTiles.push(tile);

			c = c ? false : true;

			y += fauxTileSize;
		};
		y = 0;
		c = c ? false : true;
		x += fauxTileSize;
	};

	this.width = fauxWidth;
	this.height = fauxHeight;
	this.tileSize = fauxTileSize;
	this.tiles = fauxTiles;
	
	this.events = [];

	this.tileset = new Image();
	this.tileset.src = "vorge/null.png";
	
	this.load = new Promise(function(resolve, reject) {
		map.tileset.onload = function() {
			resolve(map);
		}
	});
	
	this.draw = function(canvas) {
		var ctx = canvas.getContext("2d");
		var map = this;
		var i = 0, count = map.tiles.length;
		while (i < count) {
			var tile = map.tiles[i];
			if (tile.x < canvas.width && tile.y < canvas.height) {
				var ix = tile.i ? 32 : 0;
				ctx.drawImage(
					this.tileset, 
					ix, 0, tile.w, tile.h,
					tile.x, tile.y, tile.w, tile.h
				);
			};
			i++;
		};
	};*/
	
};