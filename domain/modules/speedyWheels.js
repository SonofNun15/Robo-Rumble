function SpeedyWheels() {
}

SpeedyWheels.prototype.getInstructionList = function() {
	return [
		instruction.move2,
		instruction.move3,
		instruction.turnLeft,
		instruction.turnRight
	];
};