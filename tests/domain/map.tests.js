describe ('Map', function() {
	it ('should collide with wall', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = {
			x: 2,
			y: 2,
			z: 0,
		};
		
		var wall = new ConcreteBlock();
		wall.coordinate = new Point(1, 0, 1);
		wall.size = {
			x: 0,
			y: 1,
			z: 1,
		};
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.east;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(wall);
		map.items.push(robot);
		
		drive.execute(instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
	});
	
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