function BasicWheels() {
	this.slots = 4;
}

BasicWheels.prototype.getInstructionList = function() {
	return [
		instruction.move1,
		instruction.move2,
		instruction.turnLeft,
		instruction.turnRight,
		instruction.uTurn
	];
};