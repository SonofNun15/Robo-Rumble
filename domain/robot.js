function Robot() {
	this.chassis = new Chassis();
	this.mods = [];
}

Robot.prototype.getInstructionList = function() {
	// Get the instruction lists from modules
	var instructionLists = _.map(this.chassis.modules, function(module) { return module.getInstructionList(); });
	
	// Flatten the instruction lists and get only unique instructions
	return _.union.apply(_, instructionLists);
};