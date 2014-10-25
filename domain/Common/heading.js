heading = {
	north: new Point(0, -1, 0),
	south: new Point(0, 1, 0),
	east: new Point(1, 0, 0),
	west: new Point(-1, 0, 0),
	up: new Point(0, 0, 1),
	down: new Point(0, 0, -1),
};

heading.clockwise = function(point) {
	if (point.equals(heading.north)) {
		return heading.east;
	}
	else if (point.equals(heading.south)) {
		return heading.west;
	}
	else if (point.equals(heading.east)) {
		return heading.south;
	}
	else if (point.equals(heading.west)) {
		return heading.north;
	}
};

heading.counterclockwise = function(point) {
	if (point.equals(heading.north)) {
		return heading.west;
	}
	else if (point.equals(heading.south)) {
		return heading.east;
	}
	else if (point.equals(heading.east)) {
		return heading.north;
	}
	else if (point.equals(heading.west)) {
		return heading.south;
	}
};

heading.rotate = function(currentSpin, point) {
	if (currentSpin == spin.clockwise)
	{
		return heading.clockwise(point);
	}
	else
	{
		return heading.counterclockwise(point);
	}
};