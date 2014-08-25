function Map() {
	this.items = [];
}

Map.prototype.move = function(movingItem, direction, pushed) {
	var map = this;
	var stop;
	//add (0.5, 0.5, 0.5) to the coordinate of the moving item to measure from the center of the space
	var origin = movingItem.coordinate.add(new Point(0.5, 0.5, 0.5));
	var movementRay = new Ray(origin.toVector(direction));
	//apply some filter to the map items
	_.each(this.items, checkForCollision);
	if (!stop) {
		movingItem.coordinate = movingItem.coordinate.add(direction);
	}
	return !stop;
	
	function checkForCollision(item) {
		if (item === movingItem) {
			//item can't collide with itself
			return;
		}
		
		if (map.intersect(movementRay, item)) {
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
	}
};

Map.prototype.intersect = function(ray, cube) {
	var bounds = [ cube.coordinate,
					new Point(cube.coordinate.x + cube.size.x
					, cube.coordinate.y + cube.size.y
					, cube.coordinate.z + cube.size.z) ];

    var tmin, tmax, tymin, tymax, tzmin, tzmax;
    tmin = (bounds[ray.sign[0]].x - ray.origin.x) * ray.invoffset.x;
    tmax = (bounds[1 - ray.sign[0]].x - ray.origin.x) * ray.invoffset.x;
    tymin = (bounds[ray.sign[1]].y - ray.origin.y) * ray.invoffset.y;
    tymax = (bounds[1 - ray.sign[1]].y - ray.origin.y) * ray.invoffset.y;
    if ((tmin > tymax) || (tymin > tmax))
        return false;
    if (tymin > tmin)
        tmin = tymin;
    if (tymax < tmax)
        tmax = tymax;
    tzmin = (bounds[ray.sign[2]].z - ray.origin.z) * ray.invoffset.z;
    tzmax = (bounds[1 - ray.sign[2]].z - ray.origin.z) * ray.invoffset.z;
    if ((tmin > tzmax) || (tzmin > tmax))
        return false;
    if (tzmin > tmin)
        tmin = tzmin;
    if (tzmax < tmax)
        tmax = tzmax;
	
	//a value of < 0 or > 1 indicates that the collision happens outside of the length of the Ray
	if ((tmin > 0 && tmin < 1) || (tmax > 0 && tmax < 1)) {
		return true;
	}
	else {
		return false;
	}
};