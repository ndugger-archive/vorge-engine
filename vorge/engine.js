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
		
		var dependancies = [];
		var depNames = [
			"project",
			"map",
			"event",
			"controls",
			"player",
			"camera"
		];
		
		depNames.forEach(function(name) {
			var dependancy = new vorge.dependancy(project.path, name);
			dependancies.push(dependancy.load);
		});
		
		Promise.all(dependancies).then(function() {
			
			var game = new vorge.project(project);
			
			var canvas = document.createElement("canvas");
			canvas.width = game.canvas.width;
			canvas.height = game.canvas.height;
			
			document.body.insertBefore(canvas, vorge.self);
			
			vorge.load(game, canvas);
			
		});
		
	},
	
	dependancy: function(path, name) {
		
		var dependancy = this;
		
		dependancy.script = document.createElement("script");
		dependancy.script.src = path + "/vorge/" + name + ".js";
		
		document.body.appendChild(dependancy.script);
		
		this.load = new Promise(function(resolve, reject) {
			dependancy.script.onload = function() {
				resolve();
			};
		});
		
	},
	
	load: function(game, canvas) {
		
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
		
	},
	
	update: function(game, canvas) {
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