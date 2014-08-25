function Map() {
	this.items = [];
}

Map.prototype.move = function(movingItem, direction) {
	var movementVector = movingItem.coordinate.toVector(direction);
	//check for collision
	movingItem.coordinate = movingItem.coordinate.add(direction);
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
	
	return true;
};