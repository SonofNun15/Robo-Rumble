describe ('Point', function() {
	it ('should invert (1, 2, 5) to (1, 0.5, 0.2)', function() {
		var point = new Point(1, 2, 5);
		var inverse = point.inverse();
		expect(inverse.x).to.equal(1);
		expect(inverse.y).to.equal(0.5);
		expect(inverse.z).to.equal(0.2);
	});
	
	it ('should invert (0, 0, 0) to infinity', function() {
		var point = new Point(0, 0, 0);
		var inverse = point.inverse();
		expect(inverse.x).to.equal(Number.POSITIVE_INFINITY);
		expect(inverse.y).to.equal(Number.POSITIVE_INFINITY);
		expect(inverse.z).to.equal(Number.POSITIVE_INFINITY);
	});
	
	it ('should get the distance to (1, 0, 0) as 1', function() {
		var point = new Point(1, 0, 0);
		var distance = point.distance();
		expect(distance).to.equal(1);
	});
	
	it ('should get the distance to (1, 1, 1) as the square root of 3', function() {
		var point = new Point(1, 1, 1);
		var distance = point.distance();
		expect(distance).to.equal(Math.sqrt(3));
	});
	
	it ('should get the distance to (3, 4, 0) as 5', function() {
		var point = new Point(3, 4, 0);
		var distance = point.distance();
		expect(distance).to.equal(5);
	});
	
	it ('should subtract (1, 2, 3) from (2, 3, 4) to get (1, 1, 1)', function() {
		var point = new Point(2, 3, 4);
		var otherPoint = new Point(1, 2, 3);
		var result = point.subtract(otherPoint);
		expect(result.x).to.equal(1);
		expect(result.y).to.equal(1);
		expect(result.z).to.equal(1);
	});
	
	it ('should get the center of an object of size (2, 2, 2) as (1, 1, 1)', function() {
		var item = {
			coordinate: new Point(0, 0, 0),
			size: new Point(2, 2, 2),
		};
		var center = item.coordinate.center(item);
		expect(center.x).to.equal(1);
		expect(center.y).to.equal(1);
		expect(center.z).to.equal(1);
	});
});