/*  __   _  ____    ____   ____    ____
	||  // //  \\  //  \\ //  \\  //  \\
	|| // //   // //     //   // //___//
	||// //   // //     //   // //
	|//  \\__// //      \\__//  \\__//
						   //
	- http://vorge.io \\__*/

vorge = {
	
	init: function(project) {
		
		this.self = document.body.getElementsByTagName("script");
		this.self = this.self[this.self.length - 2];
		
		// ==============================
		// Load Vorge dependancies
		// ==============================
		
		var dependencies = [];
		var depNames = [
			"project",
			"resource",
			"map",
			"event",
			"controls",
			"player",
			"camera"
		];
		
		depNames.forEach(function(name) {
			var dependency = new vorge.dependency(project.path, name);
			dependencies.push(dependency.load);
		});
		
		Promise.all(dependencies).then(function() {
			
			vorge.game = new vorge.project(project);
			vorge.game.assets = vorge.game.path + "/" + vorge.game.slug + "/assets";
			vorge.game.maps = vorge.game.path + "/" + vorge.game.slug + "/maps";
			
			var canvas = document.createElement("canvas");
			canvas.width = vorge.game.canvas.width;
			canvas.height = vorge.game.canvas.height;
			
			document.body.insertBefore(canvas, vorge.self);
			
			vorge.load.data(vorge.game, canvas);
			
		});
		
	},
	
	dependency: function(path, name) {
		
		var dependency = this;
		
		dependency.script = document.createElement("script");
		dependency.script.src = path + "/vorge/" + name + ".js";
		
		document.body.appendChild(dependency.script);
		
		this.load = new Promise(function(resolve, reject) {
			dependency.script.onload = function() {
				resolve();
			};
		});
		
	},
	
	load: {
		
		// Used if user does not have save data:
		primary: function(primary) {
			
			vorge.game.data = primary;
			localStorage.setItem(vorge.game.slug, JSON.stringify(primary));
			
		},
		
		data: function(game, canvas) {
			
			if (!localStorage.getItem(vorge.game.slug)) {
				var primary = new vorge.resource(
					"script", game.path + "/" + game.slug + "/primary.js",
					game.slug + "Primary"
				);
				primary.load.then(function() {
					vorge.load.data(game, canvas);
				});
				return;
			} else {
				game.data = JSON.parse(localStorage.getItem(game.slug));
			}
			
			var map = new vorge.resource(
				"script", game.maps + "/" + game.data.map + ".js",
				game.slug + "Map"
			);
			
			vorge.load.player(game.data.player);
			
			map.load.then(function() {
				
				var components = [];
				components.push(game.map.load);
				components.push(game.player.load);
				
				Promise.all(components).then(function(components) {
					
					game.components = components;
					
					vorge.play(game, canvas);
					
				})
				
			})
			
		},
		
		map: function(map) {
			vorge.game.map = new vorge.map(map, vorge.game);
		},
		
		player: function(player) {
			vorge.game.player = new vorge.player(
				player.w, player.h,
				player.pos.x, player.pos.y
			);
		}
		
	},
	
	/*load: function(game, canvas) {
		
		// ==============================
		// load savefile/data here...
		// ==============================
		// using localStorage
		
		if (!localStorage.getItem(game.slug)) {
			localStorage.setItem(game.slug, null);
		};
		
		var components = [];
		
		game.map = new vorge.map(null);
		components.push(game.map.load);
		
		game.map.events.push(new vorge.event(96, 96, 32, 32));
		game.map.events.push(new vorge.event(0, 0, 32, 32));
		game.map.events.forEach(function(event) {
			components.push(event.load);
		});
		
		game.player = new vorge.player(32, 64, 1);
		game.player.spawn(96, 96);
		components.push(game.player.load);
		
		game.camera = new vorge.camera(0, 0, canvas, game.map);
		game.camera.following = game.player;
		
		Promise.all(components).then(function(c) {
			game.components = c;
			console.log(game);
			vorge.play(game, canvas);
		});
		
	},*/
	
	update: function(game, canvas) {
		
		game.player.update(game.map);
		
		var i = 0, count = game.components.length;
		while (i < count) {
			game.components[i].draw(canvas);
			i++;
		};
		vorge.play(game, canvas);
	},
	
	play: function(game, canvas) {
		requestAnimationFrame(function() {
			vorge.update(game, canvas)
		});
	}
	
};