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
		
		drive.execute(instruction.move1, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(1);
		expect(robot.coordinate.z).to.equal(1);
	});
});