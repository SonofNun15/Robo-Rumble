function SpeedyWheels() {
	this.slots = 4;
	this.type = moduleType.drive;
}

SpeedyWheels.prototype.getInstructionList = function(complexityLevel) {
	var instructions = [
		instruction.turnLeft,
		instruction.turnRight,
		instruction.move2,
	];

	if (complexityLevel >= complexity.moderate) {
		instructions.push(instruction.move3);
	}
	
	return instructions;
};