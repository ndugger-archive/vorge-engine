var foo = new vorge.game({
	title: "Foo Game",
	dir: "./foo",
	canvas: {
		width: 640,
		height: 480
	}
});

document.body.appendChild(foo.canvas);

// loaded a map...
foo.load({
	map: new vorge.map({
		width: 1280,
		height: 960,
		grid: 32,
		tileset: new vorge.asset({
			elem: new Image(),
			src: foo.dir + "/assets/tilesets/default.png"
		}),
		tiles: [
			new vorge.rect({
				x: 32,
				y: 32,
				width: 32,
				height: 32,
				img: {
					x: 32,
					y: 32
				}
			}),
			new vorge.rect({
				x: 256,
				y: 256,
				width: 32,
				height: 32,
				img: {
					x: 32,
					y: 32
				}
			})
		]
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
				console.log(this);
			}
		})
	]
});