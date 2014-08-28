describe ('BasicWheels', function() {
	it ('should move one space', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 1);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.south;
		
		var drive = new BasicWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(1);
	});
});