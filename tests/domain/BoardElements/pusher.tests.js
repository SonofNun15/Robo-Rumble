describe ('Pusher', function() {
	it ('should push the robot one space', function() {
		var pusher = new Pusher();
		pusher.coordinate = new Point(0, 0, 0);
		pusher.heading = heading.south;
		pusher.activePhases = { '1': true };
		
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 0);
		robot.heading = heading.east;	//heading should be irrelevant, test should break if not
		
		var map = new Map();
		map.items.push(pusher);
		map.items.push(floor);
		map.items.push(robot);
		
		pusher.execute(robot, map, 1);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(0);
	});
});