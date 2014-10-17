function SoundSensor(robot) {
	_.extend(this, Sensor);
	this.robot = robot;
	this.slots = 2;
	this.range = 4;
}

SoundSensor.prototype.visible = function(item, map) {
	var distance = this.robot.coordinate.distance(item.coordinate);
	
	if (distance > this.range)
	{
		return false;
	}
	
	var ray = new Ray(this.robot.coordinate.toVector(item.coordinate));
	
	return map.isUninterrupted(ray, this.robot);
};