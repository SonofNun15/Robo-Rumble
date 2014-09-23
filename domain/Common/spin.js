spin = {
	clockwise: 0,
	counterclockwise: 1,
};

spin.rotate = function(currentSpin, point) {
	if (currentSpin == spin.clockwise)
	{
		return heading.clockwise(point);
	}
	else
	{
		return heading.counterclockwise(point);
	}
};