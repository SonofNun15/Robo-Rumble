function SoundSensor(robot) {
	_.extend(this, Sensor);
	this.robot = robot;
	this.slots = 2;
	this.range = 4;
}

SoundSensor.prototype.visible = function(item, map) {
	var location = this.robot.coordinate.center(this.robot);
	var target = item.coordinate.center(item);
	var distance = location.distance(target);
	
	if (distance > this.range)
	{
		return false;
	}
	
	var ray = new Ray(location.toVector(target.subtract(location)));
	
	return map.isUninterrupted(ray, item);
};