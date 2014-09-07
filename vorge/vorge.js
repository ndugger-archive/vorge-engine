var vorge = {
	
	game: function(config) {
		
		this.title = config.title;
		this.dir = config.dir;
		
		this.canvas = document.createElement("canvas");
		this.canvas.width = config.canvas.width;
		this.canvas.height = config.canvas.height;
		
		var self = this;
		
		this.load = function(scene) {
			
			this.scene = scene;
			
			scene.map.tileset.load.then(function() {
				
				var events = [];
				
				var i = 0, count = scene.events.length;
				while (i < count) {
					events.push(scene.events[i].sprite.load);
					i++;
				};
				
				Promise.all(events).then(function() {
					
					self.play(scene);
					
				});
				
			});
			
		};
		
		this.play = function(scene) {
			
			scene.events[0].activate();
			
			this.loop.start(scene);
			
		};
		
		this.loop = {
			
			start: function(scene) {
				
				this.iterate(this, scene);
				
			},
			
			iterate: function(loop, scene) {
				return requestAnimationFrame(function() {
					
					loop.draw(scene);
					loop.update(scene);
					
				});
			},
			
			draw: function(scene) {
				
				// Tiles:
				(function() {
					var i = 0, count = scene.map.tiles.length;
					while (i < count) {
						var tile = scene.map.tiles[i];
						tile.draw(scene.map.tileset.elem, self.canvas);
						i++;
					};
				})();
				
				// Events:
				(function() {
					var i = 0, count = scene.events.length;
					while (i < count) {
						var event = scene.events[i];
						event.self.draw(event.sprite.elem, self.canvas)
						i++;
					};
				})();
				
				// Player
				// draw player
				
			},
			
			update: function(scene) {
				
				// Player:
				// update player
				
				// Events:
				(function() {
					var i = 0, count = scene.events.length;
					while (i < count) {
						var event = scene.events[i];
						event.update();
						i++;
					};
				})();
				
				this.iterate(this, scene);
				
			}
			
		}
		
	},
	
	map: function(map) {
		
		this.width = map.width;
		this.height = map.height;
		
		this.tileset = map.tileset;
		this.tiles = map.tiles;
		
	},
	
	event: function(event) {
		
		this.sprite = event.sprite;
		
		this.self = event.self;
		
		this.activate = event.actions;
		
		this.update = function() {
			
		}
		
	},
	
	asset: function(asset, toDOM) {
		
		this.elem = asset.elem;
		this.elem.src = asset.src;
		
		if (toDOM) {
			var old = document.getElementById(toDOM);
			if (old) old.parentNode.removeChild(old);
			document.body.appendChild(this.elem);
		}
		
		var self = this;
		
		this.load = new Promise(function(resolve, reject) {
			self.elem.onload = function() {
				resolve(self.elem);
			}
		});
		
	},
	
	rect: function(rect) {
		
		this.x = rect.x;
		this.y = rect.y;
		
		this.width = rect.width;
		this.height = rect.height;
		
		this.img = rect.img;
		
		this.draw = function(img, canvas) {
			var ctx = canvas.getContext("2d");
			ctx.drawImage(
				img,
				this.img.x, this.img.y, this.width, this.height,
				this.x, this.y, this.width, this.height
			)
		}
		
	}
	
};

vorge.event.prototype = {
	foo: "bar"
}