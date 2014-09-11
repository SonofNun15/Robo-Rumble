function Robot() {
	MapItem.call(this);
	this.class = mapItemType.robot;
	this.permeability = permeability.moveable;
	this.coordinate = new Point();
	this.size = new Size(1, 1, 1);
	this.heading = heading.south;
	this.chassis = null;
	this.mods = [];
}

Robot.prototype.getAllInstructions = function(cpu) {
	var cpus = this.chassis.getCPUs();
	
	var instructionLists = _.map(this.chassis.modules, function(module) {
		// Get the module type complexity level for all cpus
		var complexityLevels = _.map(cpus, function(cpu) { return cpu.getComplexityLevel(module.type); });
		
		// Get highest complexity and use it to get the instruction list
		var maxComplexityLevel = _.max(complexityLevels);
		
		return module.getInstructionList(maxComplexityLevel);
	});
	
	// Flatten the instruction lists and get only unique instructions
	return _.union.apply(_, instructionLists);
};

Robot.prototype.getInstructionList = function(cpu) {
	// Get the instruction lists from modules
	var instructionLists = _.map(this.chassis.modules, function(module) {
		var complexityLevel = cpu.getComplexityLevel(module.type);
		return module.getInstructionList(complexityLevel);
	});
	
	// Flatten the instruction lists and get only unique instructions
	return _.union.apply(_, instructionLists);
};

Robot.prototype.executePhase = function(phase) {
	
};