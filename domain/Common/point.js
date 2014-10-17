function Point(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Point.prototype.toVector = function(relativePoint) {
	var vector = new Vector();
	vector.origin = this;
	vector.offset = relativePoint;
	return vector;
};

Point.prototype.add = function(relativePoint) {
	return new Point(this.x + relativePoint.x
					, this.y + relativePoint.y
					, this.z + relativePoint.z);
};

Point.prototype.equals = function(point) {
	return (this.x == point.x
			&& this.y == point.y
			&& this.z == point.z);
};

Point.prototype.multiply = function(num) {
	return new Point(this.x * num
					, this.y * num
					, this.z * num);
};

Point.prototype.distance = function(destination) {
	// distance of the line from this to destination using the formula d^2 = x^2 + y^2 + z^2
	if (destination == null)
	{
		destination = new Point(0, 0, 0);
	}
	
	return Math.sqrt(Math.pow(this.x - destination.x, 2)
					+ Math.pow(this.y - destination.y, 2)
					+ Math.pow(this.z - destination.z, 2));
};

Point.prototype.inverse = function() {
	var inverse = new Point(invert(this.x), invert(this.y), invert(this.z));
		
	function invert(num) {
		if (num !== 0) {
			return 1 / num;
		}
		else {
			return Number.POSITIVE_INFINITY;
		}
	}
	
	return inverse;
};