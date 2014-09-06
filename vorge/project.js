vorge.project = function(project) {
	
	this.title = project.title;
	
	this.slug = project.slug;
	
	this.path = project.path;
	
	this.canvas = project.canvas;
	
	this.save = function(data, url) {
		if (url) {
			// post data to url via xhr
		} else {
			localStorage.setItem(this.slug, JSON.stringify(data));
		}
	},
		
	this.load = function(data, url) {
		if (url) {
			// get savefile/data from url via xhr
		} else {
			
		}
	}
	
};