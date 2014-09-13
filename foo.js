var foo = new vorge.game({
	title: "Foo Game",
	dir: "./foo",
	canvas: {
		width: 640,
		height: 480
	},
	controls: {
		left: 37,
		up: 38,
		right: 39,
		down: 40
	}
});

document.body.appendChild(foo.canvas);

// loaded a map...
foo.load({
	map: new vorge.map({
		width: 640,
		height: 480,
		grid: 32,
		tileset: new vorge.asset({
			elem: new Image(),
			src: foo.dir + "/assets/tilesets/default.png"
		}),
		// Generate Fake "Checkered" Map:
		tiles: (function() {
			var tiles = [];
			var grid = 32, c = true;
			var x = 0, width = 640, height = 480;
			for (x; x < width; x += grid) {
				var y = 0;
				for (y; y < height; y += grid) {
					tiles.push(new vorge.rect({
						x: x,
						y: y,
						width: grid,
						height: grid,
						img: {
							x: c ? 32 : 192,
							y: 224
						}
					}));
					c = c ? false : true;
				};
			};
			return tiles;
		})()
	}),
	player: new vorge.player({
		sprite: new vorge.asset({
			elem: new Image(),
			src: foo.dir + "/assets/sprites/player.png"
		}),
		self: new vorge.rect({
			x: 256,
			y: 128,
			width: 32,
			height: 48,
			img: {
				x: 0,
				y: 0
			}
		})
	}),
	events: [
		new vorge.event({
			sprite: new vorge.asset({
				elem: new Image(),
				src: foo.dir + "/assets/sprites/event.png"
			}),
			self: new vorge.rect({
				x: 128,
				y: 128,
				width: 32,
				height: 32,
				img: {
					x: 32,
					y: 0
				}
			}),
			actions: function() {
				vorge.fn.dialogue("Old Man", [
					"Hello, Adventurer",
					"How are you?"
				]);
				vorge.fn.options([
					["I'm good, thanks!",
						function() {
							vorge.fn.dialogue("Old Man", [
								"That's good!"
							]);
						}
					],
					["None of your business!",
						function() {
							vorge.fn.dialogue("Old Man", [
								"How rude!?"
							]);
						}
					]
				]);
			}
		})
	]
});