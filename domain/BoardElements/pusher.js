function Pusher() {
	MapItem.call(this);
	this.type = mapItemType.boardElement;
	this.coordinate = new Point();
	this.size = new Size(1, 0, 0);	// size depends on the heading
	this.heading = heading.south;
	this.priority = { '5': true };
}

Pusher.prototype.execute = function(robot, map) {
	var currentCoordinate = this.coordinate;
	
	map.move(this, this.heading);
	
	if (!currentCoordinate.equals(this.coordinate))
	{
		map.move(this, this.heading.inverse());
	}
};

Pusher.prototype.setHeading = function(newHeading) {
	this.heading = newHeading;
	if (newHeading == heading.south || newHeading == heading.north)
	{
		this.size = new Size(1, 0, 0);
	}
	else if (newHeading == heading.east || newHeading == heading.west)
	{
		this.size = new Size(0, 1, 0);
	}
};