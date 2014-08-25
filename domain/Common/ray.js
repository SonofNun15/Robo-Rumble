function Ray(vector) {
	this.origin = vector.origin;
	this.offset = vector.offset;
	this.invoffset = vector.offset.inverse();
	this.sign = [ this.invoffset.x < 0, this.invoffset.y < 0, this.invoffset.z < 0 ];
}