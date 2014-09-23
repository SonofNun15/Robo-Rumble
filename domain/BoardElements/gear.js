function Gear() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size(1, 1, 0);
	this.spin = spin.clockwise;
	this.priority = { '4': true };
}

Gear.prototype.execute = function(robot, map) {
	if (robot.coordinate.equals(this.coordinate))
	{
		robot.heading = spin.rotate(this.spin, robot.heading);
	}
};