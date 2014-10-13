describe ('Map', function() {
	it ('should collide with wall', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var wall = new ConcreteBlock();
		wall.coordinate = new Point(1, 0, 0);
		wall.size = new Size(0, 1, 1);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(wall);
		map.items.push(robot);
		
		map.move(robot, robot.heading);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it ('should push a robot', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(3, 3, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var otherRobot = new Robot();
		otherRobot.coordinate = new Point(1, 0, 0);
		otherRobot.heading = heading.south; //heading should be irrelevant when being pushed
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		map.items.push(otherRobot);
		
		map.move(robot, robot.heading);
		
		expect(robot.coordinate.x).to.equal(1);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
		expect(otherRobot.coordinate.x).to.equal(2);
		expect(otherRobot.coordinate.y).to.equal(0);
		expect(otherRobot.coordinate.z).to.equal(0);
	});
	
	it ('should not push two robots', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(4, 4, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var robot2 = new Robot();
		robot2.coordinate = new Point(1, 0, 0);
		robot2.heading = heading.south; //heading should be irrelevant when being pushed
		
		var robot3 = new Robot();
		robot3.coordinate = new Point(2, 0, 0);
		robot3.heading = heading.north; //heading should be irrelevant when being pushed
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		map.items.push(robot2);
		map.items.push(robot3);
		
		var move = map.move(robot, robot.heading);
		
		expect(move).to.equal(false);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
		expect(robot2.coordinate.x).to.equal(1);
		expect(robot2.coordinate.y).to.equal(0);
		expect(robot2.coordinate.z).to.equal(0);
		expect(robot3.coordinate.x).to.equal(2);
		expect(robot3.coordinate.y).to.equal(0);
		expect(robot3.coordinate.z).to.equal(0);
	});
	
	it ('should fall off the edge of the map', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(1, 1, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		map.move(robot, robot.heading);
		
		expect(map.items).to.not.contain(robot);
	});
	
	it ('should fall to a lower level', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var platform = new ConcreteBlock();
		platform.coordinate = new Point(0, 0, 0);
		platform.size = new Size(1, 1, 1);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1); // on top of the platform
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(platform);
		map.items.push(robot);
		
		map.move(robot, robot.heading);
		
		expect(robot.coordinate.x).to.equal(1);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(0);
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
	
	it ('should get all robots', function() {
		var robot = new Robot();
		
		var npc = {
			type: mapItemType.npc
		};
		
		var boardElement = {
			type: mapItemType.boardElement
		};
		
		var map = new Map();
		map.items.push(robot);
		map.items.push(npc);
		map.items.push(boardElement);
		
		var robots = map.getRobots();
		
		expect(robots).to.contain(robot);
		expect(robots).to.not.contain(npc);
		expect(robots).to.not.contain(boardElement);
	});
	
	it ('should get all npcs', function() {
		var npc = {
			type: mapItemType.npc
		};
		
		var boardElement = {
			type: mapItemType.boardElement
		};
		
		var robot = new Robot();
		
		var map = new Map();
		map.items.push(npc);
		map.items.push(boardElement);
		map.items.push(robot);
		
		var npcs = map.getNPCs();
		
		expect(npcs).to.contain(npc);
		expect(npcs).to.not.contain(boardElement);
		expect(npcs).to.not.contain(robot);
	});
	
	it ('should get all board elements', function() {
		var boardElement = {
			type: mapItemType.boardElement
		};
		
		var npc = {
			type: mapItemType.npc
		};
		
		var robot = new Robot();
		
		var map = new Map();
		map.items.push(boardElement);
		map.items.push(npc);
		map.items.push(robot);
		
		var boardElements = map.getBoardElements();
		
		expect(boardElements).to.contain(boardElement);
		expect(boardElements).to.not.contain(npc);
		expect(boardElements).to.not.contain(robot);
	});
});