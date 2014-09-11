function BasicProcessor(robot) {
	this.robot = robot;
	this.slots = 2;
	this.instructions = [];
	this.cpuPriority = 0;
}

BasicProcessor.prototype.getComplexityLevel = function(type) {
	if (type == moduleType.drive)
	{
		return complexity.moderate;
	}
	else
	{
		return complexity.simple;
	}
};