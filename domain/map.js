function Map() {
	this.items = [];
}

Map.prototype.move = function(movingItem, direction) {
	var movementVector = movingItem.coordinate.toVector(direction);
	//check for collision
	movingItem.coordinate = movingItem.coordinate.add(direction);
};