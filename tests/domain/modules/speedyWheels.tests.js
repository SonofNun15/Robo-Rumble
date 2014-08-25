describe('SpeedyWheels', function() {
	it('should provide a known list of move instructions with simple complexity', function() {
		var module = new SpeedyWheels();
		
		var availableInstructions = module.getInstructionList(complexity.simple);
		expect(availableInstructions).to.have.length(3);
		expect(availableInstructions).to.contain(instruction.turnLeft);
		expect(availableInstructions).to.contain(instruction.turnRight);
		expect(availableInstructions).to.contain(instruction.move2);
	});

	it('should provide a known list of move instructions with moderate complexity', function() {
		var module = new SpeedyWheels();
		
		var availableInstructions = module.getInstructionList(complexity.moderate);
		expect(availableInstructions).to.have.length(4);
		expect(availableInstructions).to.contain(instruction.turnLeft);
		expect(availableInstructions).to.contain(instruction.turnRight);
		expect(availableInstructions).to.contain(instruction.move2);
		expect(availableInstructions).to.contain(instruction.move3);
	});
	
	it ('should move two spaces', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(3, 3, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.south;
		
		var drive = new SpeedyWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.move2, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(2);
		expect(robot.coordinate.z).to.equal(1);
	});
	
	it ('should move three spaces', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(4, 4, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.south;
		
		var drive = new SpeedyWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.move3, map);
		
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(3);
		expect(robot.coordinate.z).to.equal(1);
	});
	
	it ('should rotate right', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.east;
		
		var drive = new SpeedyWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.turnRight, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
	});
	
	it ('should rotate left', function() {
		var floor = new ConcreteBlock();
		floor.coordinate = new Point(0, 0, 0);
		floor.size = new Size(2, 2, 0);
		
		var robot = new Robot();
		robot.coordinate = new Point(0, 0, 1);
		robot.heading = heading.west;
		
		var drive = new SpeedyWheels(robot);
		
		robot.chassis = {
			modules: [ drive ],
		};
		
		var map = new Map();
		map.items.push(floor);
		map.items.push(robot);
		
		drive.execute(instruction.turnLeft, map);
		
		expect(robot.heading).to.equal(heading.south);
		expect(robot.coordinate.x).to.equal(0);
		expect(robot.coordinate.y).to.equal(0);
		expect(robot.coordinate.z).to.equal(1);
	});
});