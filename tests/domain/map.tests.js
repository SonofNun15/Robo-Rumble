describe ('Map', function() {
	it ('should collide with wall', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var wall = new ConcreteBlock();
		wall.coordinate = new Point(1, 0, 1);
		wall.size = new Size(0, 1, 1);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(wall);
		map.items.push(robot);
		
		map.move(robot, robot.heading);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
	});
	
	it ('should push a robot', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(3, 3, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.east;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var otherRobot = new Robot();
		otherRobot.coordinate = new Point(1, 0, 1);
		otherRobot.heading = heading.south; //heading should be irrelevant when being pushed
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		map.items.push(otherRobot);
		
		drive.execute(instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(1);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
		expect(otherRobot.coordinate.x).to.equal(2);
		expect(otherRobot.coordinate.y).to.equal(0);
		expect(otherRobot.coordinate.z).to.equal(1);
	});
	
	it ('should not push two robots', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(4, 4, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.east;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var robot2 = new Robot();
		robot2.coordinate = new Point(1, 0, 1);
		robot2.heading = heading.south; //heading should be irrelevant when being pushed
		
		var robot3 = new Robot();
		robot3.coordinate = new Point(2, 0, 1);
		robot3.heading = heading.north; //heading should be irrelevant when being pushed
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		map.items.push(robot2);
		map.items.push(robot3);
		
		drive.execute(instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
		expect(robot2.coordinate.x).to.equal(1);
		expect(robot2.coordinate.y).to.equal(0);
		expect(robot2.coordinate.z).to.equal(1);
		expect(robot3.coordinate.x).to.equal(2);
		expect(robot3.coordinate.y).to.equal(0);
		expect(robot3.coordinate.z).to.equal(1);
	});
	
	it ('should not intersect with cube below', function() {
		var vector = new Vector();
		vector.origin = new Point(0.5, 0.5, 0.5);
		vector.offset = new Point(1.5, 0.5, 0.5);
		var ray = new Ray(vector);
		var cube = {
			coordinate: new Point(0, 0, 0),
			size: new Size(2, 2, 0),
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
			size: new Size(0, 1, 1),
		};
		
		var map = new Map();
		
		var collision = map.intersect(ray, cube);
		
		expect(collision).to.equal(true);
	});
});