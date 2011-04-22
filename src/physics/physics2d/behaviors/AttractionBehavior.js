toxi.physics2d.AttractionBehavior = function(attractor,radius,strength,jitter){
	if(arguments.length < 3){
		throw new Error("toxi.physics2d.AttractionBehavior did not receive correct parameters");
	}
	jitter == (jitter === undefined) ? 0 : jitter;
	
	this.attractor = attractor;
	this.strength = strength;
	this.jitter = jitter;
	this.setRadius(radius);
};

toxi.physics2d.AttractionBehavior.prototype = {
	apply: function(p){
		var delta = this.attractor.sub(p);
		var dist = delta.magSquared();
		if(dist < this.radiusSquared){
			var f =
				delta.normalizeTo(1.0 - dist / this.radiusSquared)
					.jitter(this.jitter).scaleSelf(this.attrStrength);
			p.addForce(f);
		}
	},
	
	configure: function(timeStep){
		this.timeStep = timeStep;
		this.setStrength(this.strength);
	},
	
	getAttractor: function(){
		return this.attractor;
	},
	
	getJitter: function(){
		return this.jitter;
	},
	
	getRadius: function(){
		return this.radius;
	},
	
	getStrength: function(){
		return this.strength;
	},
	
	setAttractor: function(attractor){
		this.attractor = attractor;
	},
	
	setJitter: function(jitter){
		this.jitter = jitter;
	},
	
	setRadius: function(r){
		this.radius = r;
		this.radiusSquared = r * r;
	},
	
	setStrength: function(strength){
		this.strength = strength;
		this.attrStrength = strength * this.timeStep;
	}
};
	
