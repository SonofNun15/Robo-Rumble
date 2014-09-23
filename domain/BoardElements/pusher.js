function Pusher() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size(1, 0, 1);	// size depends on the heading
	this.heading = heading.south;
	this.priority = { '5': true };
	this.activePhases = {};
}

Pusher.prototype.execute = function(robot, map, phase) {
	var currentCoordinate = this.coordinate;
	
	if (utility.get(this.activePhases, phase) === true)
	{
		map.move(this, this.heading);
		
		if (!currentCoordinate.equals(this.coordinate))
		{
			map.move(this, this.heading.inverse());
		}
	}
};

Pusher.prototype.setHeading = function(newHeading) {
	this.heading = newHeading;
	if (newHeading == heading.south || newHeading == heading.north)
	{
		this.size = new Size(1, 0, 1);
	}
	else if (newHeading == heading.east || newHeading == heading.west)
	{
		this.size = new Size(0, 1, 1);
	}
};