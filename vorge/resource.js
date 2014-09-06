vorge.resource = function(elem, path, overwrite) {
	
	this.self = document.createElement(elem);
	this.self.src = path;
	
	if (overwrite) {
		
		var old = document.getElementById(overwrite);
		old.parentNode.removeChild(old);
		
		this.self.id = overwrite;
		document.body.appendChild(this.self);
		
	};
	
	var resource = this;
	
	this.load = new Promise(function(resolve, reject) {
		
		resource.self.onload = function() {
			
			resolve(resource);
			
		};
		
	});
	
};