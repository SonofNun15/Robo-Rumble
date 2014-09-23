function ConveyerBelt() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.isConveyerBelt = true;
	this.coordinate = new Point();
	this.size = new Size(1, 1, 0);
	this.heading = heading.south;
	this.priority = { '6': true };
}

ConveyerBelt.prototype.execute = function(robot, map) {
	var currentCoordinate = robot.coordinate;
	
	if (robot.coordinate.equals(this.coordinate.add(heading.up)))
	{
		map.move(robot, this.heading);
		
		if (currentCoordinate != robot.coordinate)
		{
			var targetBelt = _.first(_.filter(map.getBoardElements(), function(element) { return robot.coordinate.equals(element.coordinate.add(heading.up)) && element.isConveyerBelt; }));
			if (targetBelt.heading != this.heading)
			{
				this.turn(robot, targetBelt);
			}
		}
	}
};

ConveyerBelt.prototype.turn = function(robot, targetBelt) {
	if (targetBelt.heading.equals(heading.clockwise(this.coordinate)))
	{
		robot.coordinate = heading.clockwise(robot.coordinate);
	}
	else if (targetBelt.heading.equals(heading.counterclockwise(this.coordinate)))
	{
		robot.coordinate = heading.counterclockwise(robot.coordinate);
	}
};