describe ('ExpressBelt', function() {
	it ('should run both express belts for the robot', function() {
		var belt = new ExpressBelt();
		belt.coordinate = new Point(0, 0, 0);
		belt.heading = heading.south;
		
		var belt2 = new ExpressBelt();
		belt2.coordinate = new Point(0, 1, 0);
		belt2.heading = heading.south;
		
		var belt3 = new ExpressBelt();
		belt3.coordinate = new Point(0, 2, 0);
		belt3.heading = heading.south;
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(3, 3, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(belt);
		map.items.push(belt2);
		map.items.push(belt3);
		map.items.push(floor);
		map.items.push(robot);
		
		var scheduler = new Scheduler(map);
		scheduler.takeBoardElementTurn(robot);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(2);
		expect(robot.coordinate.z).to.equal(0);
	});
});