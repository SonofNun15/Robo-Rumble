function Crusher() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size(1, 1, 0);
	this.priority = { '3': true };
	this.activePhases = {};
}

Crusher.prototype.execute = function(robot, map, phase) {
	var currentCoordinate = robot.coordinate;
	
	if (robot.coordinate.equals(this.coordinate.add(heading.down)) && utility.get(this.activePhases, phase) === true)
	{
		map.items.remove(robot);	// destroy the current robot
	}
};