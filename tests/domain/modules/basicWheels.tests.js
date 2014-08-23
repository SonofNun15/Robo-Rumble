describe ('BasicWheels', function() {
	it ('should move one space', function() {
		var floor = new ConcreteBlock();
		floor.size.x = 2;
		floor.size.y = 2;
		
		var drive = new BasicWheels();
		
		var robot = new Robot();
		robot.coordinate.z = 1;
		robot.heading = heading.south;
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.move1);
		
		expect(robot.coordinate).to.equal(new Point(0, 1, 1));
	});
});