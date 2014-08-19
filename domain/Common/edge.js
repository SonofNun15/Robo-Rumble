function Edge() {
	this.coordinate = new Vector();
	this.orientation = orientation.z;
}

orientation = {
	x: { size: { x: 0, y: 1, z: 1 } },
	y: { size: { x: 1, y: 0, z: 1 } },
	z: { size: { x: 1, y: 1, z: 0 } }
};