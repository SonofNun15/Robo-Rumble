describe ('Gear', function() {
	it ('should turn the robot in the direction of the gear', function() {
		var gear = new Gear();
		gear.coordinate = new Point(0, 0, 0);
		gear.spin = spin.counterclockwise;
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(1, 1, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;
		
		var map = new Map();
		map.items.push(gear);
		map.items.push(floor);
		map.items.push(robot);
		
		gear.execute(robot, map);
		
		expect(robot.heading.x).to.equal(heading.north.x);	//90 counterclockwise from east should be north
		expect(robot.heading.y).to.equal(heading.north.y);
		expect(robot.heading.z).to.equal(heading.north.z);
	});
});