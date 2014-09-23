function Map() {
	this.game = {};
	this.items = [];
}

Map.prototype.getRobots = function() {
	return _.filter(this.items, function(item) { return item.type == mapItemType.robot; });
};

Map.prototype.getNPCs = function() {
	return _.filter(this.items, function(item) { return item.type == mapItemType.npc; });
};

Map.prototype.getBoardElements = function() {
	return _.filter(this.items, function(item) { return item.type == mapItemType.boardElement; });
};

Map.prototype.move = function(movingItem, direction, pushed) {
	var map = this;
	var stop;
	//add (0.5, 0.5, 0.5) to the coordinate of the moving item to measure from the center of the space
	var origin = movingItem.coordinate.add(new Point(0.5, 0.5, 0.5));
	var movementRay = new Ray(origin.toVector(direction));
	//apply some filter to the map items
	_.each(map.items, function(item) {
		if (checkForCollision(item, movementRay)) {
		stop = true;
		}
	} );
	if (!stop) {
		movingItem.coordinate = movingItem.coordinate.add(direction);
	}
	gravity();
	return !stop;
	
	function checkForCollision(item, ray) {
		var stop;
		if (item === movingItem) {
			//item can't collide with itself
			return;
		}
		
		if (map.intersect(ray, item)) {
			if (item.permeability === permeability.nonpermeable) {
				stop = true;
			}
			else if (item.permeability === permeability.moveable) {
				//only one item can be pushed. If the moving item was pushed, moveable collisions are treated the same as nonpermeable
				if (!pushed) {
					if (map.move(item, direction, true) === false) {
						stop = true;
					}
				}
				else {
					stop = true;
				}
			}
			//call interaction functions
		}
		return stop;
	}
	
	function gravity() {
		var stop = false;
		//add (0.5, 0.5, 0.5) to the coordinate of the moving item to measure from the center of the space
		var origin = movingItem.coordinate.add(new Point(0.5, 0.5, 0.5));
		var movementRay = new Ray(origin.toVector(heading.down));
		//apply some filter to the map items
		_.each(map.items, function(item) {
			if (checkForCollision(item, movementRay)) {
			stop = true;
			}
		} );
		if (!stop) {
			movingItem.coordinate = movingItem.coordinate.add(heading.down);
			if (movingItem.coordinate.z < map.bottom) {
				//item falls off the map
				map.items.remove(movingItem);
				return;
			}
			gravity();
		}
	}
};

Map.prototype.bottom = -5;

Map.prototype.intersect = function(ray, cube) {
	var bounds = [ cube.coordinate,
					new Point(cube.coordinate.x + cube.size.x
					, cube.coordinate.y + cube.size.y
					, cube.coordinate.z + cube.size.z) ];

    var minTimeToIntersect, maxTimeToIntersect, minTimeToYIntersect, maxTimeToYIntersect, minTimeToZIntersect, maxTimeToZIntersect;
    minTimeToIntersect = (bounds[ray.sign[0]].x - ray.origin.x) * ray.invoffset.x;
    maxTimeToIntersect = (bounds[1 - ray.sign[0]].x - ray.origin.x) * ray.invoffset.x;
    minTimeToYIntersect = (bounds[ray.sign[1]].y - ray.origin.y) * ray.invoffset.y;
    maxTimeToYIntersect = (bounds[1 - ray.sign[1]].y - ray.origin.y) * ray.invoffset.y;
    if ((minTimeToIntersect > maxTimeToYIntersect) || (minTimeToYIntersect > maxTimeToIntersect))
        return false;
    if (minTimeToYIntersect > minTimeToIntersect)
        minTimeToIntersect = minTimeToYIntersect;
    if (maxTimeToYIntersect < maxTimeToIntersect)
        maxTimeToIntersect = maxTimeToYIntersect;
    minTimeToZIntersect = (bounds[ray.sign[2]].z - ray.origin.z) * ray.invoffset.z;
    maxTimeToZIntersect = (bounds[1 - ray.sign[2]].z - ray.origin.z) * ray.invoffset.z;
    if ((minTimeToIntersect > maxTimeToZIntersect) || (minTimeToZIntersect > maxTimeToIntersect))
        return false;
    if (minTimeToZIntersect > minTimeToIntersect)
        minTimeToIntersect = minTimeToZIntersect;
    if (maxTimeToZIntersect < maxTimeToIntersect)
        maxTimeToIntersect = maxTimeToZIntersect;
	
	//a value of < 0 or > 1 indicates that the collision happens outside of the length of the Ray
	if ((minTimeToIntersect > 0 && minTimeToIntersect < 1) || (maxTimeToIntersect > 0 && maxTimeToIntersect < 1)) {
		return true;
	}
	else {
		return false;
	}
};