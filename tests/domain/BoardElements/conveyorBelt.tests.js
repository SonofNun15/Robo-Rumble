describe ('ConveyorBelt', function() {
	it ('should filter by Conveyor belt using isConveyorBelt', function() {
		var belt = new ConveyorBelt();
		
		var boardElement1 = {
			type: mapItemType.boardElement
		};
		
		var boardElement2 = {
			type: mapItemType.boardElement
		};
		
		var map = new Map();
		map.items.push(belt);
		map.items.push(boardElement1);
		map.items.push(boardElement2);
		
		var belts = _.filter(map.getBoardElements(), function(element) { return element.isConveyorBelt; });
		
		expect(belts).to.contain(belt);
		expect(belts).to.not.contain(boardElement1);
		expect(belts).to.not.contain(boardElement2);
	});
	
	it ('should push the robot one space', function() {
		var belt = new ConveyorBelt();
		belt.coordinate = new Point(0, 0, 0);
		belt.heading = heading.south;
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;	//heading should be irrelevant, test should break if not
		
		var map = new Map();
		map.items.push(belt);
		map.items.push(floor);
		map.items.push(robot);
		
		belt.execute(robot, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(0);
	});
	
	it ('should turn the robot if the conveyer belt turns', function() {
		var belt1 = new ConveyorBelt();
		belt1.coordinate = new Point(0, 0, 0);
		belt1.heading = heading.south;
		
		var belt2 = new ConveyorBelt();
		belt2.coordinate = new Point(0, 1, 0);
		belt2.heading = heading.east;
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(belt1);
		map.items.push(belt2);
		map.items.push(floor);
		map.items.push(robot);
		
		belt1.execute(robot, map);
		
		expect(robot.heading.x).to.equal(heading.north.x);	//90 counterclockwise from east should be north
		expect(robot.heading.y).to.equal(heading.north.y);
		expect(robot.heading.z).to.equal(heading.north.z);
	});
});