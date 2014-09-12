function SpeedyWheels(robot) {
	Module.call(this);
	this.robot = robot;
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

SpeedyWheels.prototype.execute = function(action, map) {
	if (action == instruction.move2) {
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
	}
	else if (action == instruction.move3) {
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
		map.move(this.robot, this.robot.heading);
	}
	else if (action == instruction.turnRight) {
		this.robot.heading = heading.clockwise(this.robot.heading);
	}
	else if (action == instruction.turnLeft) {
		this.robot.heading = heading.counterclockwise(this.robot.heading);
	}
};