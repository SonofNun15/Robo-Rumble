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
});