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