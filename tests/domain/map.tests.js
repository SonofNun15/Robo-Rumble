describe ('Map', function() {
	it ('should not intersect with cube below', function() {
		var vector = new Vector();
		vector.origin = new Point(0.5, 0.5, 0.5);
		vector.offset = new Point(1.5, 0.5, 0.5);
		var ray = new Ray(vector);
		var cube = {
			coordinate: new Point(0, 0, 0),
			size: {
				x: 2,
				y: 2,
				z: 0,
			},
		};
		
		var map = new Map();
		
		var collision = map.intersect(ray, cube);
		
		expect(collision).to.equal(false);
	});
	
	it ('should intersect with wall', function() {
		var vector = new Vector();
		vector.origin = new Point(0.5, 0.5, 0.5);
		vector.offset = new Point(1.5, 0.5, 0.5);
		var ray = new Ray(vector);
		var cube = {
			coordinate: new Point(1, 0, 0),
			size: {
				x: 0,
				y: 1,
				z: 1,
			},
		};
		
		var map = new Map();
		
		var collision = map.intersect(ray, cube);
		
		expect(collision).to.equal(true);
	});
});