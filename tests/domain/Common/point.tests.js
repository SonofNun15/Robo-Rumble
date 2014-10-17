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
});