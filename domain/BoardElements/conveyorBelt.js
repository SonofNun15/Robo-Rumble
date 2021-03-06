function ConveyorBelt() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.isConveyorBelt = true;
	this.coordinate = new Point();
	this.size = new Size(1, 1, 0);
	this.heading = heading.south;
	this.priority = { '6': true };
}

ConveyorBelt.prototype.execute = function(robot, map) {
	var currentCoordinate = robot.coordinate;
	
	if (robot.coordinate.equals(this.coordinate))
	{
		map.move(robot, this.heading);
		
		if (!currentCoordinate.equals(robot.coordinate))
		{
			var targetBelt = _.first(_.filter(map.getBoardElements(), function(element) { return robot.coordinate.equals(element.coordinate) && element.isConveyorBelt; }));
			if (targetBelt != null && targetBelt.heading != this.heading)
			{
				this.turn(robot, targetBelt);
			}
		}
	}
};

ConveyorBelt.prototype.turn = function(robot, targetBelt) {
	if (targetBelt.heading.equals(heading.clockwise(this.heading)))
	{
		robot.heading = heading.clockwise(robot.heading);
	}
	else if (targetBelt.heading.equals(heading.counterclockwise(this.heading)))
	{
		robot.heading = heading.counterclockwise(robot.heading);
	}
};