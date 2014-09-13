var vorge = {
	
	game: function(config) {
		
		this.title = config.title;
		this.dir = config.dir;
		
		this.canvas = document.createElement("canvas");
		this.canvas.width = config.canvas.width;
		this.canvas.height = config.canvas.height;
		
		this.keyConfig = config.controls;
		
		this.keypress = {
			left: false,
			up: false,
			right: false,
			down: false
		};
		
		var self = this;
		
		this.load = function(scene) {
			
			this.scene = scene;
			
			scene.map.tileset.load.then(function() {
				
				scene.player.sprite.load.then(function() {
					
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
				
			});
			
		};
		
		this.controls = function() {
			
			var game = self;
			var controls = this.keyConfig;
		
			window.addEventListener("keydown", function(e) {
				switch(e.keyCode) {

					case controls.left:
						game.keypress.left = true;
						break;

					case controls.up:
						game.keypress.up = true;
						break;

					case controls.right:
						game.keypress.right = true;
						break;

					case controls.down:
						game.keypress.down = true;
						break;

				};
			});

			window.addEventListener("keyup", function(e) {
				switch(e.keyCode) {

					case controls.left:
						game.keypress.left = false;
						break;

					case controls.up:
						game.keypress.up = false;
						break;

					case controls.right:
						game.keypress.right = false;
						break;

					case controls.down:
						game.keypress.down = false;
						break;

				};
			});

		};
		
		this.play = function(scene) {
			
			scene.events[0].activate();
			
			this.controls();
			
			this.loop.start(scene);
			
		};
		
		this.loop = {
			
			start: function(scene) {
				
				this.iterate(this, scene);
				
			},
			
			iterate: function(loop, scene) {
				return requestAnimationFrame(function() {
					
					var ctx = self.canvas.getContext("2d");
					ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
					
					loop.update(scene);
					loop.draw(scene);
					
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
				
				// Player:
				(function() {
					var player = scene.player;
					player.self.draw(player.sprite.elem, self.canvas);
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
				(function() {
					var player = scene.player;
					player.update(self.keypress);
				})();
				
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
	
	player: function(player) {
		
		this.sprite = player.sprite;
		
		this.self = player.self;
		
		var player = this;
		
		this.update = function(controls) {
			
			if (controls.left) {
				player.self.x--;
				player.self.img.y = player.self.height;
			};
			if (controls.up) {
				player.self.y--;
				player.self.img.y = player.self.height * 3;
			};
			if (controls.right) {
				player.self.x++;
				player.self.img.y = player.self.height * 2;
			};
			if (controls.down) {
				player.self.y++;
				player.self.img.y = 0;
			};
			
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
		
	},
	
	fn: {
		
		dialogue: function(name, lines) {
			var i = 0, count = lines.length;
			for (i; i < count; i++) {
				console.log(name + ": " + lines[i]);
			}
		},
		
		options: function(options) {
			var i = 0, count = options.length;
			for (i; i < count; i++) {
				console.log("(" + i + "): " + options[i][0]);
				options[i][1].call();
			};
		}
		
	}
	
	
	
};