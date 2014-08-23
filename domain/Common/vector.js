function Vector() {
	this.origin = new Point();
	this.offset = new Point();
}

Vector.prototype.destination = function() {
	return this.origin.add(this.offset);
};