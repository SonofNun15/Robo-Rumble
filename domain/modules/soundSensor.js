function SoundSensor(robot) {
	_.extend(this, Sensor);
	this.robot = robot;
	this.slots = 2;
	this.range = 4;
}

SoundSensor.prototype.visible = function(item, map) {
	return true;	//implement functionality
};